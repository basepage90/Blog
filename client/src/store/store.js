import { combineReducers, configureStore } from '@reduxjs/toolkit';
import error from 'store/error';
import search from 'store/search';
import sideBarHidden from 'store/sideBarHidden';
import menuClick from 'store/menuClick';
import admin from 'store/admin';
import snackBar from 'store/snackBar';

const rootReducer = combineReducers({
    error: error.reducer,
    search: search.reducer,
    sideBarHidden: sideBarHidden.reducer,
    menuClick: menuClick.reducer,
    admin: admin.reducer,
    snackBar: snackBar.reducer

});

const store = configureStore({
    reducer: rootReducer
});

export const {transSideBar,transMobileFlag} = sideBarHidden.actions;
export const {click} = menuClick.actions;
export const {adminOpen, adminClose} = admin.actions;
export const {snackBarOpen, snackBarClose} = snackBar.actions;

export default store;