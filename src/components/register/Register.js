import {Formik, Form, Field, ErrorMessage} from 'formik';
import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import {  useDispatch, useSelector,   } from "react-redux";
import Loader from '../loader/Loader';
import {RegisterModel} from '../../model/RegisterModel';
import {updateShowLoader, setErrorMessage, setSuccessMessage} from '../../store/reducers/loaderSlice';
import './Register.css';
import { logoutAction, signupAuth } from '../../store/reducers/AuthSlice';
import { useNavigate } from "react-router-dom";
import { formatError, runLogoutTimer } from '../../services/SignupService';
import AlertError from '../alerts/AlertError';
import AlertSuccess from '../alerts/AlertSuccess';

const Register = (props) => {
    const validationSchema = Yup.object().shape({
        email : Yup.string().email(' Invalid email address').required('email is required'),
        password : Yup.string().required('password is required').min(6, 'Password must be at least 6 characters'),
        confirmPassword : Yup.string().required('Please confirm your password').oneOf(
            [Yup.ref('password'), null], 'Password must match'),
    });
    const [registerForm, setRegisterForm] = useState(new RegisterModel());
    const dispatch = useDispatch();
    const showLoading = useSelector(state => state.loader.showLoader);
    
    const errorMessage = useSelector(state => state.loader.errorMessage);
    const successMessage = useSelector(state => state.loader.successMessage);
    const navigate = useNavigate();

    function handleSignUpFormSubmit(values,actions){
        dispatch(updateShowLoader(true));
        dispatch(signupAuth(values)).then(response =>{
            const types = response.type.split('/');
            const type = types[types.length - 1];
            
            if(type === 'fulfilled'){
                actions.resetForm();
                dispatch(setErrorMessage(''));
                dispatch(setSuccessMessage('Signup Successfully!'));
                runLogoutTimer(dispatch, response.payload.expiresIn * 1000, navigate);
                navigate('/login');
            }
            else if(type === 'rejected'){
                const message = formatError(response.payload.error);
                dispatch(setErrorMessage(message));
                dispatch(setSuccessMessage(''));
            }
            
        })
        
    }

    useEffect(()=>{
        dispatch(setErrorMessage(''));
        dispatch(setSuccessMessage(''));
    }, []);

    return(
        <div className="container">
            { showLoading && <Loader /> }
            {errorMessage && <AlertError/>}
            {successMessage && <AlertSuccess />}
            <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

                    <div className="d-flex justify-content-center py-4">
                        <a href="index.html" className="logo d-flex align-items-center w-auto">
                        <img src="" alt="" />
                        <span className="d-none d-lg-block">FKTECH</span>
                        </a>
                    </div>

                    <div className="card mb-3">

                        <div className="card-body">

                        <div className="pt-4 pb-2">
                            <h5 className="card-title text-center pb-0 fs-4">Create an Account</h5>
                            <p className="text-center small">Enter your personal details to create account</p>
                        </div>
                        
                        
                        <Formik enableReinitialize initialValues={registerForm} 
                            onSubmit={handleSignUpFormSubmit} 
                            validationSchema={validationSchema} >
                             {({touched, errors}) => (
                                <Form className="row g-3 needs-validation">
                                    <div className="col-12">
                                        <label for="email" className="form-label">Your Email</label>
                                        <Field type="email" name="email" id="email"  className={`form-control 
                                        ${touched.email && errors.email && 'is-invalid'} ${touched.email && !errors.email && 'is-valid'}`  }/>
                                        <ErrorMessage name="email" component="div" className="invalid-feedback"/>
                                    </div>
                                    <div className="col-12">
                                        <label for="password" className="form-label">Password</label>
                                        <Field type="password" name="password" id="password"  className={`form-control 
                                        ${touched.password && errors.password && 'is-invalid'} 
                                        ${touched.password && !errors.password && 'is-valid'}`  }/>
                                        <ErrorMessage name="password" component="div" className="invalid-feedback"/>
                                    </div>
                                    <div className="col-12">
                                        <label for="confirmPassword" className="form-label">Confirm Password</label>
                                        <Field type="password" name="confirmPassword" id="confirmPassword"  className={`form-control 
                                        ${touched.confirmPassword && errors.confirmPassword && 'is-invalid'} 
                                        ${touched.confirmPassword && !errors.confirmPassword && 'is-valid'}`  }/>
                                        <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback"/>
                                    </div>
                                    <div className="col-12">
                                     <button className="btn btn-primary w-100" type="submit">Create Account</button>
                                    </div>
                                    <div className="col-12">
                                     <p className="small mb-0">Already have an account? <a href="/login">Log in</a></p>
                                    </div>
                                </Form>
                             )}
                        </Formik>

                        </div>
                    </div>

                    <div className="credits">
                        Designed by FouwaKu
                    </div>

                    </div>
                </div>
                </div>

            </section>

        </div>
    );
}

export default Register;