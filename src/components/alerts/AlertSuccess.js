import { useDispatch, useSelector } from "react-redux";
import {  setSuccessMessage } from "../../store/reducers/loaderSlice";
import './AlertError.css';

const AlertSuccess = (props) => {
    const successMessage = useSelector(state => state.loader.successMessage);
    const dispatch = useDispatch();
    return (
        
            
                <div className="col-md-4 ml-auto" id="alertMessage">
                   <div className="alert alert-success alert-dismissible fade show" role="alert">
                        <button type="button" onClick={(e) => {dispatch(setSuccessMessage(''))}}
                          className="btn-close" aria-label="Close">
                            <span aria-hidden="True"> &times; </span>
                        </button>
                        <h4 className="alert-heading">Success!!!</h4>
                        <p>{successMessage}</p>
                   </div> 
                </div>
           
       
    );
}

export default AlertSuccess;