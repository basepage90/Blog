import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    id: '',
    title: '',
    hashtag: '',
    info: '',
    contents: '',
    desc: '',
};

const article = createSlice({
  name: "article",
  initialState: initialState,
  reducers: {
    cardClick : (state,action) => { 
        state.id = action.payload.id
        state.title = action.payload.title
        state.hashtag = action.payload.hashtag
        state.info = action.payload.info
        state.contents = action.payload.contents
        state.desc = action.payload.desc
    },
  }
});

export default article;