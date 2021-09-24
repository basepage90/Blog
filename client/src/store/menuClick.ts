import { createSlice } from '@reduxjs/toolkit';

export interface MenuClickState {
  open: boolean;
}

const initState: MenuClickState = {
  open: false
};

const menuClick = createSlice({
  name: "menuClick",
  initialState: initState,
  reducers: {
    click : (state) => { state.open = !state.open },
  }
});

export default menuClick;