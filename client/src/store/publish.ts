import { createSlice } from '@reduxjs/toolkit';

export interface PublishState {
  open: boolean;
}

const initState: PublishState = {
  open : false
};

const publish = createSlice({
  name: "publish",
  initialState: initState,
  reducers: {
    openPublisher : (state) => { state.open = true },
    closePublisher : (state) => { state.open = false },
  }
});

export default publish;