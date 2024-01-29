
import { logoutAction, loginConfirmedAction, resetAction } from "../store/reducers/AuthSlice";

export function formatError(errorResponse) {
    switch (errorResponse.message) {
        case 'EMAIL_EXISTS':
            return 'Email already exits';
        case 'EMAIL_NOT_FOUND':
            return 'Email not found';
        case 'INVALID_PASSWORD': 
        case 'INVALID_LOGIN_CREDENTIALS':
            return 'Invalid Loign Credentials';
        case 'USER_DISABLED':
            return 'User Disabled';
        
        default:
            return '';
    }
}

export function saveTokenInLocalStorage(tokenDetails) {
    const userDetails = tokenDetails;
    userDetails.expireDate = new Date(new Date().getTime() + tokenDetails.expiresIn * 1000).toString();
    localStorage.setItem('userDetails', JSON.stringify(userDetails));
}

export function runLogoutTimer(dispatch, timer,navigate) {
    
    setTimeout(() => {
        dispatch(logoutAction(navigate));
    }, timer);
}

export const checkAutoLogin = (dispatch, navigate) => {
    const tokenDetailsString = localStorage.getItem('userDetails');
    let tokenDetails = '';
    
    if (!tokenDetailsString) {
        dispatch(resetAction());
        return;
    }
    tokenDetails = JSON.parse(tokenDetailsString);
    let expireDate = new Date(tokenDetails.expireDate);
    let todayDate = new Date();

    if (todayDate > expireDate) {
        dispatch(logoutAction(navigate));
        return;
    } 
    

    dispatch(loginConfirmedAction(tokenDetails));
    const timer = expireDate.getTime() - todayDate.getTime();
    navigate('/admin');
    runLogoutTimer(dispatch,timer, navigate);
}