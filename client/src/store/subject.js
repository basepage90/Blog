import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  layout: "Home",
  path: "",
};

const subject = createSlice({
  name: 'subject',
  initialState,
  reducers: {
    updateSubject: (state,action) => { 
                                       state.layout = action.payload.layout;
                                       state.path = action.payload.path;
                                     }
  },
});

export default subject;