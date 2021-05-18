import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sideBarState: false,
};

const sideBarHidden = createSlice({
  name: 'sideBarHidden',
  initialState,
  reducers: {
    hidden: (state,action) => ({sideBarState: true}),
    open : (state,action) => {state.sideBarState = false},
  },
});

export default sideBarHidden;