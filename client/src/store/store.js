import { combineReducers, configureStore } from '@reduxjs/toolkit';
import error from './error';
import search from './search';
import sideBarHidden from './sideBarHidden';
import menuClick from './menuClick';

const rootReducer = combineReducers({
    error: error.reducer,
    search: search.reducer,
    sideBarHidden: sideBarHidden.reducer,
    menuClick: menuClick.reducer,
});

const store = configureStore({
    reducer: rootReducer
});

export const {hidden,open} = sideBarHidden.actions;
export const {click} = menuClick.actions;

export default store;