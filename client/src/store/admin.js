import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    open: false,
};

const admin = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    adminOpen: (state) => {state.open = true},
    adminClose : (state) => {state.open = false},
  },
});

export default admin;