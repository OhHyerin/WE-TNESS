import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../../api/index';

const signup = createAsyncThunk('signup', async (payload, { rejectWithValue }) => {
  try {
    const res = await axios.post(api.signup(), payload);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response);
  }
});

const checkNickname = createAsyncThunk('checkNickname', async (payload, { rejectWithValue }) => {
  const nickname = payload;
  try {
    const res = await axios.get(api.checkNickname(nickname));
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

const checkEmail = createAsyncThunk('checkEmail', async (payload, { rejectWithValue }) => {
  const email = payload;
  try {
    const res = await axios.get(api.checkEmail(email));
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

const addInfo = createAsyncThunk('addInfo', async (payload, { rejectWithValue }) => {
  console.log(payload);
  try {
    const res = await axios.get(api.addInfo(payload));
    console.log(res);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response);
  }
});

const initialState = {
  userInfo: {
    nickname: '',
    email: '',
    password: '',
    pwdVerify: '',
  },
  isModal: false,
  isPossibleNickname: false,
  isPossibleEmail: false,
  errorMsg: '',
};

export const SignupSlice = createSlice({
  name: 'singup',
  initialState,
  reducers: {
    fetchNickname: (state, action) => {
      state.userInfo.nickname = action.payload;
    },
    fetchEmail: (state, action) => {
      state.userInfo.email = action.payload;
    },
    fetchPassword: (state, action) => {
      state.userInfo.password = action.payload;
    },
    fetchPwdVerify: (state, action) => {
      state.userInfo.pwdVerify = action.payload;
    },
    toggleIsModal: state => {
      state.isModal = !state.isModal;
    },
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
    [checkNickname.fulfilled]: (state, action) => {
      state.isPossibleNickname = !action.payload.exist;
    },
    [checkEmail.fulfilled]: (state, action) => {
      state.isPossibleEmail = !action.payload.exist;
      state.errorMsg = '';
    },
    [checkEmail.rejected]: state => {
      state.isPossibleEmail = false;
      state.errorMsg = '올바른 이메일 형식으로 입력해주세요.';
    },
    [addInfo.fulfilled]: state => {
      state.isModal = false;
    },
  },
});

export { signup, checkNickname, checkEmail, addInfo };

export const { fetchNickname, fetchEmail, fetchPassword, fetchPwdVerify, toggleIsModal } = SignupSlice.actions;

export default SignupSlice.reducer;
