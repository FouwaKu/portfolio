import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { firebaseConfig } from "../../Firebase";
import {axiosInstance2} from '../../axiosConfig/AxiosInstances';
import { updateShowLoader } from './loaderSlice';
import {   saveTokenInLocalStorage } from "../../services/SignupService";


const initialState = {
    auth: {
        email: '',
        idToken: '',
        localId: '',
        expiresIn: '',
        refreshToken: '',
    },
    
    status: 'idle',
};



const authSlice = createSlice({
    name: 'auth',
    initialState : initialState,
    reducers : {
        logoutAction : (state, action) => {
            localStorage.removeItem('userDetails');
            action.payload('/');
            state.auth = {
                    email: '',
                    idToken: '',
                    localId: '',
                    expiresIn: '',
                    refreshToken: '',
            };
            state.status = 'idle';
        },
        resetAction: (state, action) =>{
            state.auth = {
                email: '',
                idToken: '',
                localId: '',
                expiresIn: '',
                refreshToken: '',
            };
            state.status = 'idle';
        },
        loginConfirmedAction: (state, action) =>{
            state.auth = {...state.auth, ...action.payload};
            state.status = 'success';
        },
        testAction : (state, action) => {
            state.status = 'maybe';
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginAth.pending, (state ) => {
            state.auth.status = 'peding';
        })
        .addCase(loginAth.fulfilled, (state, action) =>{
            
            saveTokenInLocalStorage(action.payload);
            state.auth = {...state.auth, ...action.payload};
            state.auth.status = 'success';
        })
        .addCase(loginAth.rejected, (state, action) =>{
            state.auth.status = 'failed'; 
        })
        .addCase(signupAuth.pending, (state) => {
            state.status = 'pending';
        })
        .addCase(signupAuth.fulfilled, (state, action) => {
            state.auth = {...state.auth, ...action.payload};
            saveTokenInLocalStorage(action.payload);
            state.status = 'success';
        })
        .addCase(signupAuth.rejected, (state, action) => {
            state.status = 'failed';  
        })
    
    },

});

export const loginAth = createAsyncThunk( 
    'auth/login',
    async (values, {rejectWithValue, dispatch, getState} ) =>{
        values.returnSecureToken = true;
        const axiosInstance = axiosInstance2;
        try {
            const response = await axiosInstance.post(
                `accounts:signInWithPassword?key=${firebaseConfig.apiKey}`,
                values,
            );
            dispatch(updateShowLoader(false));
            return response.data;
        } catch (error) {

            dispatch(updateShowLoader(false));
            return rejectWithValue(error.response.data);
        }
        
        
    }
);

export const signupAuth = createAsyncThunk(
  'auth/signup',
   async (values, {rejectWithValue, dispatch, getState}) =>{
    values.returnSecureToken = true;
    const axiosInstance = axiosInstance2;
    try {
        const response = await axiosInstance.post(
            `accounts:signUp?key=${firebaseConfig.apiKey}`,
            values,
        );
        dispatch(updateShowLoader(false));
        
        return response.data;
    } catch (error) {

        dispatch(updateShowLoader(false));
       return rejectWithValue(error.response.data);
    }
   } 
);
export const {logoutAction, loginConfirmedAction, testAction, resetAction} = authSlice.actions;
export default authSlice.reducer;