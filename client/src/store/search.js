import { createSlice } from '@reduxjs/toolkit';

const initState = {text : ""};

const search = createSlice({
  name: "searchReducer",
  initialState: initState,
  reducers: {
    update : (state,action) => ( {text: action.payload} ),
  }
});

export default search;