import { createSlice } from '@reduxjs/toolkit';

export interface UserState {
  nickname: string;
  email: string;
  admin_flag: boolean;
}

const initialState: UserState = {
    nickname: "",
    email: "",
    admin_flag: false,
};

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state,action) => {
      state.nickname = action.payload.nickname;
      state.email = action.payload.email;
      state.admin_flag = action.payload.admin_flag;
     },
  },
});

export default user;