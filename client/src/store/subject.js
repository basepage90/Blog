import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  layout: "Home",
  path: "",
};

const subject = createSlice({
  name: 'subject',
  initialState,
  reducers: {
    updateLayout: (state,action) => {state.layout = action.payload},
    updatePath : (state,action) => {state.path = action.payload},
  },
});

export default subject;