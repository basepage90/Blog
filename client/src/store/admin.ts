import { createSlice } from '@reduxjs/toolkit';

export interface AdminState {
  open: boolean;
}

const initialState: AdminState = {
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