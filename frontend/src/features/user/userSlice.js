import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLogin: false,
  nickname: '동근',
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    login: state => {
      state.isLogin = !state.isLogin;
    },
    logout: state => {
      state.isLogin = !state.isLogin;
    },
  },
});

export const { login, logout } = counterSlice.actions;

export default counterSlice.reducer;
