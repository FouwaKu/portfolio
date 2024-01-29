import React from "react";
import { NavLink,useNavigate } from "react-router-dom";
import "../../loader/InnerLoader.css";
import { updateShowLoader, setErrorMessage, setSuccessMessage } from "../../../store/reducers/loaderSlice";
import AlertError from "../../alerts/AlertError";
import AlertSuccess from "../../alerts/AlertSuccess";
import { useDispatch, useSelector } from "react-redux";
import {  useEffect } from 'react';
import { deleteCategory, getCategories } from "../../../store/reducers/PortfolioSlice";
import './CategoryList.css';

const CategoryList = (props) =>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const showLoading = useSelector(state => state.loader.showLoader);
    const errorMessage = useSelector(state => state.loader.errorMessage);
    const successMessage = useSelector(state => state.loader.successMessage);
    const {category} = useSelector(state => state.portfolio);
    useEffect(()=>{
        dispatch(setErrorMessage(''));
        dispatch(setSuccessMessage(''));
        if(category && !category.length){
            dispatch(updateShowLoader(true));
            dispatch(getCategories('category.json')).then(response =>{
                const types = response.type.split('/');
                const type = types[types.length - 1];
                if(type === 'rejected'){
                    dispatch(setErrorMessage('An error occured. Try again!!!'));
                    dispatch(setSuccessMessage(''));
                }
            });
        }
       
    }, []);
    const navigateToProjectList = (categoryID, e) => {
        navigate(`/admin/project/${categoryID}`);
    }
    const navigateToCategoryEdit = (category, e) =>{
        e.stopPropagation();
        navigate('/admin/create-category', {state : category})
    }
    const removeCategory = (category, e) =>{
        e.stopPropagation();
        dispatch(updateShowLoader(true));
        dispatch(deleteCategory(category)).then(response =>{
            const types = response.type.split('/');
            const type = types[types.length - 1];
            if(type === 'fulfilled'){
                dispatch(setErrorMessage(''));
                dispatch(setSuccessMessage('Deleted Successfully!'));
            }
            else if(type === 'rejected'){
                dispatch(setErrorMessage('An error occured. Try again!!!'));
                dispatch(setSuccessMessage(''));
            }
        });
    };
    return (
        <React.Fragment>
            
            {errorMessage && <AlertError/>}
            {successMessage && <AlertSuccess />}
            <div className="pagetitle">
                <h1>Category List</h1>
                <hr/>
            </div>
            <div className="categoryOptions  clearfix">
                 <NavLink to='/admin/create-category' className='btn btn-primary me-2 float-end'><i className="bi bi-patch-plus"></i> Add Category</NavLink>   
            </div>
            <div className="card mt-3">
                <div className="card-body">
                    <h5 className="card-title">Categories</h5>

                    
                    <table className="table table-hover text-center">
                        
                        <tbody>
                        { showLoading &&  
                            <tr>
                                <td id="preinnerloader"></td>
                            </tr>   
                        }
                        {category && category.map((cat,i) =>
                        
                            <tr className="categoryLink" key={i} onClick={(e)=>{navigateToProjectList(cat.id, e)}}>
                                <th scope="row">{i + 1}</th>
                                <td>{cat.category}</td>
                                <td><i className='bi bi-pencil' onClick={(e)=>{navigateToCategoryEdit(cat, e)}}></i></td>
                                <td><i className='bi bi-trash-fill text-danger' onClick={(e)=>{removeCategory(cat, e)}}></i></td>
                            </tr>
                        )}
                        
                        
                        </tbody>
                    </table>
                    

                </div>
            </div> 
        </React.Fragment>
    );
};

export default CategoryList;