import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Loader from "../../loader/Loader";
import InnerLoader from "../../loader/InnerLoader";
import { updateShowLoader, setErrorMessage, setSuccessMessage } from "../../../store/reducers/loaderSlice";
import AlertError from "../../alerts/AlertError";
import AlertSuccess from "../../alerts/AlertSuccess";
import { useDispatch, useSelector } from "react-redux";
import {  useEffect } from 'react';
import { deleteProject, getProjects } from "../../../store/reducers/PortfolioSlice";
import { findProjectCategory } from "../../../services/PortfolioService";
import { getProjectsByCategory } from "../../../store/selectors/PortfolioSelector";
import './ProjectList.css';



const ProjectList = (props) =>{
    const dispatch = useDispatch();
    const showLoading = useSelector(state => state.loader.showLoader);
    const errorMessage = useSelector(state => state.loader.errorMessage);
    const successMessage = useSelector(state => state.loader.successMessage);
    let {category} = useSelector(state => state.portfolio);
    const location = useLocation();
    const pathname = location.pathname.split('/');
    const categorID = pathname[pathname.length - 1];
    let project = useSelector(state =>getProjectsByCategory(state, categorID));
    const [categoryName, setcategoryName] = useState('');
    
    useEffect(()=>{
        setcategoryName( findProjectCategory(categorID, category)[0].category );
        dispatch(setErrorMessage(''));
        dispatch(setSuccessMessage(''));
        if(project && !project.length){
            dispatch(updateShowLoader(true));
            dispatch(getProjects('project.json')).then(response =>{
                const types = response.type.split('/');
                const type = types[types.length - 1];
                if(type === 'rejected'){
                    dispatch(setErrorMessage('An error occured. Try again!!!'));
                    dispatch(setSuccessMessage(''));
                }
               
            });
        }  
       
    }, []);

    
   
       

        
    const removeProject = (project, e) =>{
        e.stopPropagation();
        dispatch(updateShowLoader(true));
        
        dispatch(deleteProject(project)).then(response =>{
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
            <h1>Project List</h1>
            <hr/>
        </div>
        <div className="categoryOptions  clearfix">   
             <NavLink to='/admin/create-project' className='btn btn-secondary float-end'><i className="bi bi-patch-plus"></i> Add Project</NavLink>
        </div>
        <div className="card mt-3">
            <div className="card-body">
                <h5 className="card-title">Projects</h5>

                <div className="table-responsive">
                <table className="table table-striped text-center">
                    <thead>
                    <tr className="">
                        <th scope="col">#</th>
                        <th scope="col">Category</th>
                        <th scope="col">Client</th>
                        <th scope="col">Date</th>
                        <th scope="col">Description</th>
                        <th scope="col">URL</th>
                        <th scope="col">Images</th>
                    </tr>
                    </thead>
                    <tbody>
                     { showLoading &&  
                     <tr>
                        <td> <InnerLoader />  </td>
                     </tr>   
                    }
                    {project && project.map((pro,i) =>
                    
                        <tr key={i} className="">
                            <th scope="row">{i + 1}</th>
                            <td>{categoryName}</td>
                            <td>{pro.client}</td>
                            <td>{pro.date}</td>
                            <td>{pro.description}</td>
                            <td>{pro.url}</td>
                            <td><span className="badge bg-primary badge-number">{pro.images.split(',').length}</span></td>
                            <td className="projectDelete"><i className='bi bi-trash-fill text-danger' onClick={(e)=>{removeProject(pro, e)}}></i></td>
                        </tr>
                    )}
                    
                    
                    </tbody>
                </table>
              </div>

            </div>
        </div> 
    </React.Fragment>
    );
};

export default ProjectList;
