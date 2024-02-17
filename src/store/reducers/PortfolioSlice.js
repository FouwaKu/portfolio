import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {axiosInstance1, setAxiosParams} from '../../axiosConfig/AxiosInstances';
import { updateShowLoader } from './loaderSlice';
import {  formatCategories, formatProjects } from '../../services/PortfolioService';


const initialState = {
    category: [],
    project: [],
    status: 'idle',
};

const portfolioSlice = createSlice({
    name: 'portfolio',
    initialState : initialState,
    reducers : {
        setProjectCategory : (state, action) => {
            state.project[action.payload.index].categoryName = action.payload.categoryName;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createCategory.pending, (state ) => {
            state.status = 'peding';
        })
        .addCase(createCategory.fulfilled, (state, action) =>{
            state.category = [...state.category, action.payload];
            state.status = 'success';
        })
        .addCase(createCategory.rejected, (state, action) =>{
            state.status = 'failed';
        })
        .addCase(getCategories.pending, (state ) => {
            state.status = 'peding';
        })
        .addCase(getCategories.fulfilled, (state, action) =>{
            state.category = action.payload;
            state.status = 'success';
        })
        .addCase(getCategories.rejected, (state, action) =>{
            state.status = 'failed';
        })
        .addCase(getProjects.pending, (state ) => {
            state.status = 'peding';
        })
        .addCase(getProjects.fulfilled, (state, action) =>{

            state.project = action.payload;
            state.status = 'success';
        })
        .addCase(getProjects.rejected, (state, action) =>{
            state.status = 'failed';
        })
       .addCase(createProject.pending, (state ) => {
            state.status = 'peding';
        })
        .addCase(createProject.fulfilled, (state, action) =>{
            state.project = [...state.project, action.payload];
            state.status = 'success';
        })
        .addCase(createProject.rejected, (state, action) =>{
            state.status = 'failed';
        })
        .addCase(editCategory.pending, (state ) => {
            state.status = 'peding';
        })
        .addCase(editCategory.fulfilled, (state, action) =>{
            const categoryIndex = state.category.findIndex(c => c.id === action.payload.id);
            state.category[categoryIndex] = action.payload;
            state.status = 'success';
        })
        .addCase(editCategory.rejected, (state, action) =>{
            state.status = 'failed';
        })
        .addCase(deleteCategory.pending, (state ) => {
            state.status = 'peding';
        })
        .addCase(deleteCategory.fulfilled, (state, action) =>{
            const categoryIndex = state.category.findIndex(c => c.id === action.payload.id);
            state.category.splice(categoryIndex, 1);
            state.status = 'success';
        })
        .addCase(deleteCategory.rejected, (state, action) =>{
            state.status = 'failed';
        })
        .addCase(deleteProject.pending, (state ) => {
            state.status = 'peding';
        })
        .addCase(deleteProject.fulfilled, (state, action) =>{
            const projectIndex = state.project.findIndex(p => p.id === action.payload.id);
            state.project.splice(projectIndex, 1);
            state.status = 'success';
        })
        .addCase(deleteProject.rejected, (state, action) =>{
            state.status = 'failed';
        })
    },
});



export const createCategory = createAsyncThunk(
    'category/create',
    async (values, {rejectWithValue, dispatch, getState} ) =>{
        const token = getState().auth.auth.idToken;
        setAxiosParams(token);
        const axiosInstance = axiosInstance1;
        try {
            const response = await axiosInstance.post(
                `category.json`,
                values,
            );
            dispatch(updateShowLoader(false));

            return {id: response.data.name, category: values.category };
        } catch (error) {
            dispatch(updateShowLoader(false));
            return rejectWithValue(error.response.data);
        }


    }
);

export const deleteCategory = createAsyncThunk(
    'category/delete',
    async (values, {rejectWithValue, dispatch, getState} ) =>{
        const token = getState().auth.auth.idToken;
        setAxiosParams(token);
        const axiosInstance = axiosInstance1;
        try {
             await axiosInstance.delete(
                `category/${values.id}.json`,
            );
            dispatch(updateShowLoader(false));
            return {id: values.id };
        } catch (error) {
            dispatch(updateShowLoader(false));
            return rejectWithValue(error.response.data);
        }


    }
);

export const editCategory = createAsyncThunk(
    'category/edit',
    async (values, {rejectWithValue, dispatch, getState} ) =>{
        const token = getState().auth.auth.idToken;
        setAxiosParams(token);
        const axiosInstance = axiosInstance1;
        try {
            await axiosInstance.put(
                `category/${values.id}.json`,
                values,
            );
            dispatch(updateShowLoader(false));

            return values;
        } catch (error) {
            dispatch(updateShowLoader(false));
            return rejectWithValue(error.response.data);
        }


    }
);

export const createProject = createAsyncThunk(
    'project/create',
    async (values, {rejectWithValue, dispatch, getState} ) =>{
        const token = getState().auth.auth.idToken;
        setAxiosParams(token);
        const axiosInstance = axiosInstance1;
        try {
            const response = await axiosInstance.post(
                `project.json`,
                values,
            );
            dispatch(updateShowLoader(false));

            return {...values, id: response.data.name };
        } catch (error) {
            dispatch(updateShowLoader(false));
            return rejectWithValue(error.response.data);
        }


    }
);

export const deleteProject = createAsyncThunk(
    'project/delete',
    async (values, {rejectWithValue, dispatch, getState} ) =>{
        const token = getState().auth.auth.idToken;
        setAxiosParams(token);
        const axiosInstance = axiosInstance1;
        try {
            await axiosInstance.delete(
                `project/${values.id}.json`,
            );
            dispatch(updateShowLoader(false));
            return {id: values.id };
        } catch (error) {
            dispatch(updateShowLoader(false));
            return rejectWithValue(error.response.data);
        }


    }
);

export const getCategories = createAsyncThunk(
    'category/getAll',
    async (topDomain, {rejectWithValue, dispatch, getState}) =>{
        const token = getState().auth.auth.idToken;
        setAxiosParams(token);
        const axiosInstance = axiosInstance1;
        try {
            const response = await axiosInstance.get(
                topDomain,
            );
            dispatch(updateShowLoader(false));

            return formatCategories(response.data);
        } catch (error) {
            dispatch(updateShowLoader(false));
            return rejectWithValue(error.response.data);
        }


    }
);

export const getProjects = createAsyncThunk(
    'project/getAll',
    async (topDomain, {rejectWithValue, dispatch, getState}) =>{
        const token = getState().auth.auth.idToken;
        setAxiosParams(token);
        const axiosInstance = axiosInstance1;
        try {
            const response = await axiosInstance.get(
                topDomain,
            );
            dispatch(updateShowLoader(false));

            return formatProjects(response.data);
        } catch (error) {
            dispatch(updateShowLoader(false));
            return rejectWithValue(error.response.data);
        }


    }
);

export const {setProjectCategory} = portfolioSlice.actions;
export default portfolioSlice.reducer;
