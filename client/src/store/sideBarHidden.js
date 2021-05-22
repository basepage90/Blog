import { createSlice } from '@reduxjs/toolkit';

const browserWidth = window.innerWidth || document.body.clientWidth ;

const initSideBar = browserWidth < 768 ? true:false;

const initialState = {
  sideBarState: false,
  mobileFlag : initSideBar,
};

const sideBarHidden = createSlice({
  name: 'sideBarHidden',
  initialState,
  reducers: {
    transSideBar : (state,action) => {state.sideBarState = !state.sideBarState},
    transMobileFlag : (state,action) => {state.mobileFlag = action.payload},
  },
});

export default sideBarHidden;