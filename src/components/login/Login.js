import {Formik, Form, Field, ErrorMessage} from 'formik';
import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import Loader from '../loader/Loader';
import { LoginModel } from '../../model/LoginModel';
import {  useDispatch, useSelector,   } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import {updateShowLoader, setErrorMessage, setSuccessMessage} from '../../store/reducers/loaderSlice';
import { loginAth } from '../../store/reducers/AuthSlice';
import { formatError, runLogoutTimer } from '../../services/SignupService';
import AlertError from '../alerts/AlertError';
import AlertSuccess from '../alerts/AlertSuccess';
import '../register/Register.css';

const Login = (props) => {
    
    const validationSchema = Yup.object().shape({
        email : Yup.string().email(' Invalid email address').required('email is required'),
        password : Yup.string().required('password is required'),
    });
    const [loginForm, setLoginForm] = useState(new LoginModel());
    const dispatch = useDispatch();
    const showLoading = useSelector(state => state.loader.showLoader);
    const errorMessage = useSelector(state => state.loader.errorMessage);
    const successMessage = useSelector(state => state.loader.successMessage);
    const navigate = useNavigate();
    
    function handleSignUpFormSubmit(values,actions){
        dispatch(updateShowLoader(true));
        dispatch(loginAth(values)).then(response =>{
            const types = response.type.split('/');
            const type = types[types.length - 1];

            if(type === 'fulfilled'){
                actions.resetForm();
                dispatch(setErrorMessage(''));
                dispatch(setSuccessMessage('login Successfully!'));
                runLogoutTimer(dispatch, response.payload.expiresIn * 1000, navigate);
                navigate('/admin');
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

    return (
        <div className="container">
            { showLoading && <Loader /> }
            {errorMessage && <AlertError/>}
            {successMessage && <AlertSuccess />}
            <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

                    <div className="d-flex justify-content-center py-4">
                        <a href="#" className="logo d-flex align-items-center w-auto">
                            <span className="d-none d-lg-block">FKTECH</span>
                        </a>
                    </div>

                    <div className="card mb-3">

                        <div className="card-body">

                        <div className="pt-4 pb-2">
                            <h5 className="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                            <p className="text-center small">Enter your username & password to login</p>
                        </div>

                        <Formik enableReinitialize initialValues={loginForm} 
                            onSubmit={handleSignUpFormSubmit} 
                            validationSchema={validationSchema} >
                             {({touched, errors}) => (
                                <Form className="row g-3 needs-validation">
                                    <div className="col-12">
                                        <label  className="form-label">Email</label>
                                        <div className="input-group has-validation">
                                            <span className="input-group-text" id="inputGroupPrepend">@</span>
                                            <Field type="email" name="email" id="email"  className={`form-control 
                                            ${touched.email && errors.email && 'is-invalid'} ${touched.email && !errors.email && 'is-valid'}`  }/>
                                            <ErrorMessage name="email" component="div" className="invalid-feedback"/>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label">Password</label>
                                        <Field type="password" name="password" id="password"  className={`form-control 
                                        ${touched.password && errors.password && 'is-invalid'} 
                                        ${touched.password && !errors.password && 'is-valid'}`  }/>
                                        <ErrorMessage name="password" component="div" className="invalid-feedback"/>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-check">
                                            <Field type="checkbox" name="remember" value="true" id="rememberMe" className="form-check-input" />
                                            <label className="form-check-label">Remember me</label>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <button className="btn btn-primary w-100" type="submit">Login</button>
                                    </div>
                                </Form>
                             )}
                             
                        </Formik>
                            <div className="col-12 mt-2">
                                <p className="small mb-0">Don't have account? 
                                    <NavLink to='/register'>Create an account</NavLink>
                                </p>
                             </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>

            </section>

        </div>
    );
}

export default Login;