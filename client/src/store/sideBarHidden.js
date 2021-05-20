import { createSlice } from '@reduxjs/toolkit';

const browserWidth = window.innerWidth || document.body.clientWidth ;

const initSideBar = browserWidth < 768 ? true:false;

const initialState = {
  sideBarState: initSideBar,
  initSideBar : initSideBar,
};

const sideBarHidden = createSlice({
  name: 'sideBarHidden',
  initialState,
  reducers: {
    hidden: (state,action) => {state.sideBarState = true},
    open : (state,action) => {state.sideBarState = false},
  },
});

export default sideBarHidden;