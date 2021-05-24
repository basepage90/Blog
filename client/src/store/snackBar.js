import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    open: false,
};

const snackBar = createSlice({
  name: 'snackBar',
  initialState,
  reducers: {
    snackBarOpen: (state) => {state.open = true},
    snackBarClose : (state) => {state.open = false},
  },
});

export default snackBar;