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
import setConfig from '../authHeader';

const login = createAsyncThunk('login', async (payload, { rejectWithValue }) => {
  try {
    const res = await axios.post(api.login(), payload, {});
    setAccessToken(res.data.accessToken);
    setRefreshToken(res.data.refreshToken);
    setCurrentUser(decodeAccessToken(res.data.accessToken));
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

const logout = createAsyncThunk('logout', async (arg, { rejectWithValue }) => {
  try {
    const res = await axios.post(api.logout(), {}, setConfig());
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

const fetchFollowingList = createAsyncThunk('fetchFollowingList', async (arg, { rejectWithValue }) => {
  try {
    const res = await axios.get(api.fetchFollowingList(), setConfig());
    console.log(res);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response);
  }
});

const fetchFollowerList = createAsyncThunk('fetchFollowerList', async (arg, { rejectWithValue }) => {
  try {
    const res = await axios.get(api.fetchFollowerList(), setConfig());
    console.log(res);
    return res.data;
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

const findPassword = createAsyncThunk('findPassword', async (payload, { rejectWithValue }) => {
  try {
    console.log(payload);
    const response = await axios.post(api.findPassword(), payload);
    return response;
  } catch (err) {
    return rejectWithValue(err.response);
  }
});

const signout = createAsyncThunk('signout', async (arg, { rejectWithValue }) => {
  try {
    const res = await axios.delete(api.signout(), {}, setConfig());
    removeAccessToken();
    removeRefreshToken();
    removeCurrentUser();
    console.log(res);
    return res.data;
  } catch (err) {
    console.log(err);
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
  followingList: [
    {
      nickname: '',
      loginState: false,
    },
  ],
  followerList: [
    {
      nickname: '',
      loginState: false,
    },
  ],
  isLoding: false,
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
    toggleIsLoding: state => {
      state.isLoding = true;
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
    [logout.fulfilled]: (state, action) => {
      state.isAuthenticated = false;
      removeAccessToken();
      removeRefreshToken();
      removeCurrentUser();
    },
    [fetchFollowingList.fulfilled]: (state, action) => {
      state.followingList = action.payload.followList;
    },
    [fetchFollowerList.fulfilled]: (state, action) => {
      state.followerList = action.payload.followList;
    },
    [kakaoLogin.fulfilled]: (state, action) => {
      state.kakaoInfo = action.payload;
    },
    [signout.fulfilled]: state => {
      state.isAuthenticated = false;
    },
  },
});

export { login, logout, fetchFollowingList, fetchFollowerList, kakaoLogin, findPassword, signout };
export const { fetchCurrentUser, checkLogin, toggleIsLoding } = UserSlice.actions;

export default UserSlice.reducer;
