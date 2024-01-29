//import {  formatError, saveTokenInLocalStorage } from "../../services/SignupService";
import { loginAth, signupAuth } from "./AuthSlice";


export const authExtraReducers = (builder) => {
    builder.addCase(loginAth.pending, (state ) => {
        state.auth.status = 'peding';
    })
    .addCase(loginAth.fulfilled, (state, action) =>{
        
        //saveTokenInLocalStorage(action.payload);
        state.auth = {...state.auth, ...action.payload};
        state.auth.errorMessage = '';
        state.auth.successMessage = 'Login Successfully!';
        state.auth.status = 'success';
    })
    .addCase(loginAth.rejected, (state, action) =>{
        const message = ''; //formatError(action.payload);
        state.auth.errorMessage = message;
        state.auth.successMessage = '';
        state.auth.status = 'failed';
        
    })
    .addCase(signupAuth.pending, (state) => {
        state.status = 'pending';
    })
    .addCase(signupAuth.fulfilled, (state, action) => {
        state.auth = {...state.auth, ...action.payload};
        //saveTokenInLocalStorage(action.payload);
        state.status = 'success';
    })
    .addCase(signupAuth.rejected, (state, action) => {
        const message = ''; //formatError(action.payload.error);
        console.log('failed Response : ' , message);
        state.status = 'failed';  
    })

};

