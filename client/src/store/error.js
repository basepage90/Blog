import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  errorType: null,
};

const error = createSlice({
  name: 'error',
  initialState,
  reducers: {
    showNotFound: (state,action) => state.errorType = 'NOT_FOUND',
    reset : (state,action) => state.errorType = null,
  },
});

export default error;
