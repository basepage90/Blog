import { combineReducers, configureStore } from '@reduxjs/toolkit';
import error from './error';
import search from './search';
import sideBarHidden from './sideBarHidden';
import subject from './subject';


const rootReducer = combineReducers({
    error: error.reducer,
    search: search.reducer,
    sideBarHidden: sideBarHidden.reducer,
    subject: subject.reducer,
});

const store = configureStore({
    reducer: rootReducer
});


export const {hidden,open} = sideBarHidden.actions;
export const {updateLayout,updatePath} = subject.actions;

export default store;
