import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PostState {
  contents: string;
}

const initialState: PostState = {
    contents: "",
};

const post = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setContents: (state,action: PayloadAction<string>) => {state.contents = action.payload},
  },
});

export default post;