import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../../api/index'

const signup = createAsyncThunk(
  'signup',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(api.signup(), payload);
      console.log(response)
      // setToken()
      return response;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

const checkNickname = createAsyncThunk(
  'checkNickname',
  async (payload, { rejectWithValue }) => {
    const {nickname} = payload
    try {
      const response = await axios.get(api.nicknameCheck(nickname));
      return response;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

const initialState = {
  userInfo: {
    nickname: '',
    email: '',
    password: '',
    pwdVerify: '',
    gender: '',
    addressCode: '',
    weight: '',
    height: '',
  },
  isPossibleNickname: false,
};

export const SignupSlice = createSlice({
  name: 'singup',
  initialState,
  reducers: {
    fetchNickname: (state, action) => {
      state.userInfo.nickname = action.payload
    },
    fetchEmail: (state, action) => {
      state.userInfo.email = action.payload
    },
    fetchPassword: (state, action) => {
      state.userInfo.password = action.payload
    },
    fetchPwdVerify: (state, action) => {
      state.userInfo.pwdVerify = action.payload
    },
    fetchGender: (state, action) => {
      state.userInfo.gender = action.payload
    },
    fetchAddressCode: (state, action) => {
      state.userInfo.addressCode = action.payload
    },
    fetchHeight: (state, action) => {
      state.userInfo.height = action.payload
    },
    fetchWeight: (state, action) => {
      state.userInfo.weight = action.payload
    }
  },
  extraReducers: {
    [signup.pending]: state => {
      state.isLoading = true;
    },
    [signup.fulfilled]: state => {
      state.isLoading = false;
    },
    [signup.rejected]: state => {
      state.isLoading = false;
    },
    [checkNickname.fulfilled]: state => {
      state.isPossibleNickName = true;
    },
    [checkNickname.rejected]: state => {
      state.isPossibleNickName = false;
    },
  }
});

export { signup, checkNickname }
export const {
  fetchNickname,
  fetchEmail,
  fetchPassword,
  fetchPwdVerify,
  fetchGender,
  fetchAddressCode,
  fetchHeight,
  fetchWeight,
} = SignupSlice.actions;

export default SignupSlice.reducer;