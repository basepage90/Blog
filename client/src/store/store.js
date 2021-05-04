import { combineReducers, configureStore } from '@reduxjs/toolkit';
import error from './error';
import search from './search';


const rootReducer = combineReducers({
    error: error.reducer,
    search: search.reducer
});


const store = configureStore({
    reducer: rootReducer
});

export default store;