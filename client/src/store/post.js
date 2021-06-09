import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    contents: "",
};

const post = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setContents: (state,action) => {state.contents = action.payload},
  },
});

export default post;