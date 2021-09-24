import { createSlice } from '@reduxjs/toolkit';

export interface SnackBarState {
  open: boolean;
}

const initialState: SnackBarState = {
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