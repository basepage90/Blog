import { createSlice } from '@reduxjs/toolkit';

export interface ErrorState {
  errorType: string | null;
}

const initialState: ErrorState = {
  errorType: null,
};

const error = createSlice({
  name: 'error',
  initialState,
  reducers: {
    showNotFound: (state) => {state.errorType = 'NOT_FOUND'},
    reset : (state) => {state.errorType = null},
  },
});

export default error;
