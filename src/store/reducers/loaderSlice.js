import {createSlice} from '@reduxjs/toolkit';


const initialState = {
   showLoader: false,
   errorMessage: '',
   successMessage: '',
};

export const loaderSlice = createSlice({
    name: 'loader',
    initialState : initialState,
    reducers : {
        updateShowLoader : (state, action) => {
            state.showLoader = action.payload;
        },
        setErrorMessage : (state, action) =>{
            state.errorMessage = action.payload;
        },
        setSuccessMessage : (state, action) =>{
            state.successMessage = action.payload;
        },
    },
   

});

export const {updateShowLoader, setErrorMessage, setSuccessMessage} = loaderSlice.actions;
export default loaderSlice.reducer;