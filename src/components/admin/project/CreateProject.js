import React, { cloneElement } from "react";
import {Formik, Form, Field, ErrorMessage, useField} from 'formik';
import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import Loader from "../../loader/Loader";
import { updateShowLoader, setErrorMessage, setSuccessMessage } from "../../../store/reducers/loaderSlice";
import AlertError from "../../alerts/AlertError";
import AlertSuccess from "../../alerts/AlertSuccess";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProject, getCategories } from "../../../store/reducers/PortfolioSlice";
import {storage} from '../../../Firebase';
import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';

const CreateProject = (props) =>{
    const [projectForm, setProjectForm] = useState({
        category: '',
        client: '',
        date: '',
        url: '',
        description: '',
        images: [],
    });
    
    const validationSchema = Yup.object().shape({
        category : Yup.string().required('category is required'),
        date : Yup.string().required('date is required'),
        description : Yup.string().required('description is required'),
        images: Yup.mixed().required('at least one image is required').test('fileType', 'File must be an image', (value) =>{
                if (value && value.length > 0) {
                    
                    const supportedTypes = ['image/jpeg', 'image/png', 'image/gif'];
                    for (let index = 0; index < value.length; index++) {
                        if (!supportedTypes.includes(value[index].type)) {
                            return false;
                        }
                    }
                    
                    return true;
                }
            }).test('fileSize', 'File must be at most 1MB', (value) =>{
                if (value && value.length > 0) {
                    const MAX_SIZE = Math.pow(2,20) * 1;
                    for (let index = 0; index < value.length; index++) {
                        if (value[index].size > MAX_SIZE) {
                            return false;
                        }
                    }
                    return true;
                }
            })
    });

    
    const dispatch = useDispatch();
    const showLoading = useSelector(state => state.loader.showLoader);
    const errorMessage = useSelector(state => state.loader.errorMessage);
    const successMessage = useSelector(state => state.loader.successMessage);
    const navigate = useNavigate();
    const {category} = useSelector(state => state.portfolio);
    const handleUpload = async (file) => {
        let image = '';
        
        
            const storageRef = ref(storage, `images/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
            
           const uploadFileAndRetrieveURL = async (uploadTask) =>{
                await uploadTask;
                image = await getDownloadURL(uploadTask.snapshot.ref);
               
           }
           await uploadFileAndRetrieveURL(uploadTask);
        
        return  image;
    };
    async function  handleSignUpFormSubmit(values,actions){
        let images = '';
        dispatch(updateShowLoader(true));
        for (const image of values.images) {
            images = images  + await handleUpload(image) + ',';
        }
        images = images.slice(0, -1);
        values.images = images;
        dispatch(createProject(values)).then(response =>{
            const types = response.type.split('/');
            const type = types[types.length - 1];
            if(type === 'fulfilled'){
                actions.resetForm();
                dispatch(setErrorMessage(''));
                dispatch(setSuccessMessage('Saved Successfully!'));
                navigate(`/admin/project/${values.category}`);
            }
            else if(type === 'rejected'){
                dispatch(setErrorMessage('An error occured. Try again!!!'));
                dispatch(setSuccessMessage(''));
            }
        });

    };
    useEffect(()=>{
        dispatch(setErrorMessage(''));
        dispatch(setSuccessMessage(''));
        if(category && !category.length){
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
   
    return (
        <React.Fragment>
            { showLoading && <Loader /> }
            {errorMessage && <AlertError/>}
            {successMessage && <AlertSuccess />}
            <div className="container">
                <div className="row">
                    <div className="pagetitle">
                        <h1>Create Project</h1>
                        <hr/>
                    </div>
                    <div className="col-md-6 offset-md-3">
                        <Formik enableReinitialize initialValues={projectForm} 
                                onSubmit={handleSignUpFormSubmit} 
                                validationSchema={validationSchema} >
                            {({touched, errors, setFieldValue}) => (
                                <Form>
                                  <div className="form-group mt-2">
                                        <label>Category</label>
                                        <Field as='select' name="category" id="category"  className={`form-select 
                                            ${touched.category && errors.category && 'is-invalid'} ${touched.category && !errors.category && 'is-valid'}`  }>
                                                <option value=''>--- Select a category ---</option>
                                                {category && category.map((cat,i) =>
                                                    <option key={i} value={cat.id}>{cat.category}</option>
                                                )}
                                        </Field>
                                        <ErrorMessage name="category" component="div" className="invalid-feedback"/>
                                  </div>
                                  <div className="form-group mt-2">
                                        <label>Client</label>
                                        <Field type="text" name="client" id="client"  className={`form-control 
                                            ${touched.client && errors.client && 'is-invalid'} ${touched.client && !errors.client && 'is-valid'}`  }/>
                                        <ErrorMessage name="client" component="div" className="invalid-feedback"/>
                                  </div>
                                  <div className="form-group mt-2">
                                        <label>Date</label>
                                        <Field type="date" name="date" id="date"  className={`form-control 
                                            ${touched.date && errors.date && 'is-invalid'} ${touched.date && !errors.date && 'is-valid'}`  }/>
                                        <ErrorMessage name="date" component="div" className="invalid-feedback"/>
                                  </div>
                                  <div className="form-group mt-2">
                                        <label>URL</label>
                                        <Field type="text" name="url" id="url"  className={`form-control 
                                            ${touched.url && errors.url && 'is-invalid'} ${touched.url && !errors.url && 'is-valid'}`  }/>
                                        <ErrorMessage name="url" component="div" className="invalid-feedback"/>
                                  </div>
                                  <div className="form-group mt-2">
                                        <label>Description</label>
                                        <Field as='textarea' name="description" id="description"  className={`form-control 
                                            ${touched.description && errors.description && 'is-invalid'} ${touched.description && !errors.description && 'is-valid'}`  }/>
                                        <ErrorMessage name="description" component="div" className="invalid-feedback"/>
                                  </div>
                                  <div className="form-group mt-2">
                                        <label>Images</label>
                                        <Field  name="images" id="images"  >
                                            {({field, form}) => (
                                                <div>
                                                    <input type="file" multiple className={`form-control ${touched.images && errors.images && 'is-invalid'} 
                                                    ${touched.images && !errors.images && 'is-valid'}`  } 
                                                    onChange={(e) => { setFieldValue('images', e.target.files) } }/>
                                                    <ErrorMessage name="images" component="div" className="invalid-feedback"/>
                                                </div>
                                            )}
                                        </Field>
                                        
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
}

export default CreateProject;