import {configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import loaderReducer from './reducers/loaderSlice';
import AuthReducer from './reducers/AuthSlice';
import portfolioReducer from './reducers/PortfolioSlice';

const reduxStore = configureStore({
    reducer: {
        auth: AuthReducer,
        loader: loaderReducer,
        portfolio: portfolioReducer, 
    },
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware(),
       thunk
    ]
    
});
export default reduxStore;