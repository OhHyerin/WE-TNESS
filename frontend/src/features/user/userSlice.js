import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLogin: false,
  nickname: '동근',
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    switchLoginState: (state) => {
      state.isLogin = !state.isLogin
    },
  },
})

export const { switchLoginState } = counterSlice.actions

export default counterSlice.reducer