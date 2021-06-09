import { createSlice } from '@reduxjs/toolkit';

const initState = {open : false};

const publish = createSlice({
  name: "publishReducer",
  initialState: initState,
  reducers: {
    openPublisher : (state,action) => { state.open = true },
    closePublisher : (state,action) => { state.open = false },
  }
});

export default publish;