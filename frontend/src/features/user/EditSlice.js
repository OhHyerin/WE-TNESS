import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../../api/index';
import config from '../authHeader';

const fetchUserInfo = createAsyncThunk('fetchUserInfo', async (payload, { rejectWithValue }) => {
  try {
    const res = await axios.get(api.fetchUserInfo(), {}, config);
    console.log(res);
    return res;
  } catch (err) {
    return rejectWithValue(err.response);
  }
});

const edit = createAsyncThunk('edit', async (payload, { rejectWithValue }) => {
  try {
    const res = await axios.put(api.edit(), payload, config);
    console.log(res);
    return res;
  } catch (err) {
    return rejectWithValue(err.response);
  }
});

const changePassword = createAsyncThunk('changePassword', async (payload, { rejectWithValue }) => {
  try {
    const res = await axios.patch(api.changePassword(), payload, config);
    return res;
  } catch (err) {
    return rejectWithValue(err.response);
  }
});

const initialState = {
  userInfo: {
    nickname: '',
    email: '',
    gender: '',
    address: '',
    weight: '',
    height: '',
  },
  addressCode: '',
};

export const SignupSlice = createSlice({
  name: 'edit',
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
    fetchGender: (state, action) => {
      state.userInfo.gender = action.payload;
    },
    fetchAddressCode: (state, action) => {
      state.addressCode = action.payload;
    },
    fetchHeight: (state, action) => {
      state.userInfo.height = action.payload;
    },
    fetchWeight: (state, action) => {
      state.userInfo.weight = action.payload;
    },
  },
  extraReducers: {
    [edit.pending]: state => {
      state.isLoading = true;
    },
    [edit.fulfilled]: state => {
      state.isLoading = false;
    },
    [edit.rejected]: state => {
      state.isLoading = false;
    },
    [fetchUserInfo.fulfilled]: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export { fetchUserInfo, edit, changePassword };

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
