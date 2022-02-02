import { createSlice } from '@reduxjs/toolkit';

export interface NotificationState {
  focusNoti: boolean;
}

const initState: NotificationState = {
  focusNoti : false,
}

const notification = createSlice({
  name: "notification",
  initialState: initState,
  reducers: {
    updateFucusNoti: (state) =>  { state.focusNoti = !state.focusNoti } ,
  }
});

export default notification;