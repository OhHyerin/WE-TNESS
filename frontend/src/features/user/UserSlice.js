import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  setAccessToken,
  removeAccessToken,
  setRefreshToken,
  removeRefreshToken,
  decodeAccessToken,
  setCurrentUser,
  removeCurrentUser,
  getCurrentUser,
} from '../Token';
import api from '../../api/index';
import config from '../authHeader';

const login = createAsyncThunk('login', async (payload, { rejectWithValue }) => {
  try {
    const res = await axios.post(api.login(), payload);
    setAccessToken(res.data.accessToken);
    setRefreshToken(res.data.refreshToken);
    setCurrentUser(decodeAccessToken(res.data.accessToken));
    return res;
  } catch (err) {
    return rejectWithValue(err.response);
  }
});

const logout = createAsyncThunk('logout', async (state, { rejectWithValue }) => {
  try {
    const res = await axios.post(api.logout(), {}, config);
    removeAccessToken();
    removeRefreshToken();
    removeCurrentUser();
    return res;
  } catch (err) {
    return rejectWithValue(err.response);
  }
});

const fetchFollowList = createAsyncThunk('fetchFollowList', async (payload, { rejectWithValue }) => {
  const { nickname } = payload;
  try {
    const response = await axios.get(api.fetchFollowList());
    return response;
  } catch (err) {
    return rejectWithValue(err.response);
  }
});

const fetchHistory = createAsyncThunk('fetchHistory', async (state, { rejectWithValue }) => {
  try {
    const response = await axios.get(api.fetchHistory());
    return response;
  } catch (err) {
    return rejectWithValue(err.response);
  }
});

const kakaoLogin = createAsyncThunk('kakaoLogin', async (payload, { rejectWithValue }) => {
  console.log(payload);
  try {
    const res = await axios.post(api.kakao(), payload);
    console.log(res);
    return res;
  } catch (err) {
    return rejectWithValue(err.response);
  }
});

const edit = createAsyncThunk('edit', async (payload, { rejectWithValue }) => {
  try {
    const response = await axios.post(api.edit(), payload);
    return response;
  } catch (err) {
    return rejectWithValue(err.response);
  }
});

const findPassword = createAsyncThunk('findPassword', async (payload, { rejectWithValue }) => {
  try {
    console.log(payload);
    const response = await axios.post(api.findPassword(), payload);
    return response;
  } catch (err) {
    return rejectWithValue(err.response);
  }
});

const initialState = {
  currentUser: {
    nickname: '',
    email: '',
    exp: '',
    role: '',
  },
  kakaoInfo: {
    exist_user: false,
    accessToken: '',
  },
  followList: {},
  isAuthenticated: false,
  isLoading: false,
};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    checkLogin: state => {
      state.isAuthenticated = true;
    },
  },
  extraReducers: {
    [login.fulfilled]: state => {
      state.isAuthenticated = true;
      state.currentUser = getCurrentUser();
    },
    [login.rejected]: state => {
      state.isAuthenticated = false;
    },
    [logout.fulfilled]: state => {
      state.isAuthenticated = false;
    },
    [fetchFollowList.fulfilled]: (state, action) => {
      state.followList = action.payload;
    },
    [kakaoLogin.fulfilled]: (state, action) => {
      state.kakaoInfo = action.payload;
    },
  },
});

export { login, logout, fetchFollowList, fetchHistory, kakaoLogin, edit, findPassword };
export const { fetchCurrentUser, checkLogin } = UserSlice.actions;

export default UserSlice.reducer;
