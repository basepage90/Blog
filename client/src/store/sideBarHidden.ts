import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const browserWidth = window.innerWidth || document.body.clientWidth ;

const initSideBar = browserWidth < 768 ? true:false;


export interface SideBarHiddenState {
  sideBarState: boolean;
  mobileFlag: boolean;
}

const initialState: SideBarHiddenState = {
  sideBarState: false,
  mobileFlag : initSideBar,
};

const sideBarHidden = createSlice({
  name: 'sideBarHidden',
  initialState,
  reducers: {
    transSideBar : (state) => {state.sideBarState = !state.sideBarState},
    transMobileFlag : (state,action: PayloadAction<boolean>) => {state.mobileFlag = action.payload},
  },
});

export default sideBarHidden;