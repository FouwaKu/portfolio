import { useDispatch, useSelector } from "react-redux";
import { setErrorMessage } from "../../store/reducers/loaderSlice";
import './AlertError.css';

const AlertError = (props) => {
    const errorMessage = useSelector(state => state.loader.errorMessage);
    const dispatch = useDispatch();
    return (
        
            
                <div className="col-md-4 ml-auto" id="alertMessage">
                   <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        <button type="button" onClick={(e) => {dispatch(setErrorMessage(''))}}
                          className="btn-close" aria-label="Close">
                            <span aria-hidden="True"> &times; </span>
                        </button>
                        <h4 className="alert-heading">Error!!!</h4>
                        <p>{errorMessage}</p>
                   </div> 
                </div>
           
       
    );
}

export default AlertError;