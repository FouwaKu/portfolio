import React from "react";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import Loader from "../../loader/Loader";
import { updateShowLoader, setErrorMessage, setSuccessMessage } from "../../../store/reducers/loaderSlice";
import AlertError from "../../alerts/AlertError";
import AlertSuccess from "../../alerts/AlertSuccess";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { createCategory, editCategory } from "../../../store/reducers/PortfolioSlice";

const InsertCategory = (props) => {
    const [categoryForm, setCategoryForm] = useState({id: '',category: ''});
    const validationSchema = Yup.object().shape({
        category : Yup.string().required('category is required'),
    });
    const dispatch = useDispatch();
    const showLoading = useSelector(state => state.loader.showLoader);
    const errorMessage = useSelector(state => state.loader.errorMessage);
    const successMessage = useSelector(state => state.loader.successMessage);
    const navigate = useNavigate();
    const location = useLocation();
    const categoryData = location.state;
    
    function handleSignUpFormSubmit(values,actions){
        dispatch(updateShowLoader(true));
        if (!values.id) {
            dispatch(createCategory(values)).then(response =>{
                const types = response.type.split('/');
                const type = types[types.length - 1];
                if(type === 'fulfilled'){
                    actions.resetForm();
                    dispatch(setErrorMessage(''));
                    dispatch(setSuccessMessage('Saved Successfully!'));
                    navigate('/admin/category');
                }
                else if(type === 'rejected'){
                    dispatch(setErrorMessage('An error occured. Try again!!!'));
                    dispatch(setSuccessMessage(''));
                }
            });
        }
        else{
            dispatch(updateShowLoader(true));
            dispatch(editCategory(values)).then(response =>{
                const types = response.type.split('/');
                const type = types[types.length - 1];
                if(type === 'fulfilled'){
                    actions.resetForm();
                    dispatch(setErrorMessage(''));
                    dispatch(setSuccessMessage('Saved Successfully!'));
                    navigate('/admin/category');
                }
                else if(type === 'rejected'){
                    dispatch(setErrorMessage('An error occured. Try again!!!'));
                    dispatch(setSuccessMessage(''));
                }
            });
        }
        
        

    };
    useEffect(()=>{
        dispatch(setErrorMessage(''));
        dispatch(setSuccessMessage(''));
        if (categoryData) {
            setCategoryForm(categoryData);
        }
    }, []);
    return (
        <React.Fragment>
            { showLoading && <Loader /> }
            {errorMessage && <AlertError/>}
            {successMessage && <AlertSuccess />}
            <div className="container">
                <div className="row">
                <div className="pagetitle">
                    {categoryData && <h1>Edit Category</h1>}
                    {!categoryData && <h1>Create Category</h1>}
                    <hr/>
                </div>
                    <div className="col-md-6 offset-md-3">
                        <Formik enableReinitialize initialValues={categoryForm} 
                                onSubmit={handleSignUpFormSubmit} 
                                validationSchema={validationSchema} >
                            {({touched, errors}) => (
                                <Form>
                                    <div className="form-group">
                                        <label>Category</label>
                                        <Field type="text" name="category" id="category"  className={`form-control 
                                            ${touched.category && errors.category && 'is-invalid'} ${touched.category && !errors.category && 'is-valid'}`  }/>
                                        <ErrorMessage name="category" component="div" className="invalid-feedback"/>
                                    </div>
                                    <div className="form-group mt-2">
                                        <button type="submit" className="btn  btn-primary">Submit</button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default InsertCategory;