import { createSlice } from '@reduxjs/toolkit';

const initState = {click: false};

const menuClick = createSlice({
  name: "menuClick",
  initialState: initState,
  reducers: {
    click : (state,action) => { state.click = !state.click },
  }
});

export default menuClick;