import { createSlice } from '@reduxjs/toolkit';

const initState = {open: false};

const menuClick = createSlice({
  name: "menuClick",
  initialState: initState,
  reducers: {
    click : (state) => { state.open = !state.open },
  }
});

export default menuClick;