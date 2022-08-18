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

const fetchFollowingList = createAsyncThunk('fetchFollowingList', async (nickname, { rejectWithValue }) => {
  try {
    const res = await axios.get(api.fetchFollowingList(nickname), setConfig());
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

const fetchFollowerList = createAsyncThunk('fetchFollowerList', async (nickname, { rejectWithValue }) => {
  try {
    const res = await axios.get(api.fetchFollowerList(nickname), setConfig());
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

const toggleFollow = createAsyncThunk('toggleFollow', async (nickname, { rejectWithValue }) => {
  const payload = {
    nickname,
  };
  try {
    const res = await axios.post(api.toggleFollow(), payload, setConfig());
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

const fetchFollowState = createAsyncThunk('fetchFollowState', async (nickname, { rejectWithValue }) => {
  try {
    const res = await axios.get(api.fetchFollowState(nickname), setConfig());
    console.log(res.data);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

const kakaoLogin = createAsyncThunk('kakaoLogin', async (code, { rejectWithValue }) => {
  try {
    const res = await axios.post(api.kakao(), {}, { params: { code } });
    setAccessToken(res.data.accessToken);
    setRefreshToken(res.data.refreshToken);
    setCurrentUser(decodeAccessToken(res.data.accessToken));
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

const findPassword = createAsyncThunk('findPassword', async (payload, { rejectWithValue }) => {
  try {
    const response = await axios.post(api.findPassword(), payload);
    return response;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

const signout = createAsyncThunk('signout', async (arg, { rejectWithValue }) => {
  try {
    const res = await axios.delete(api.signout(), {}, setConfig());
    removeAccessToken();
    removeRefreshToken();
    removeCurrentUser();
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
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
    existUser: true,
    accessToken: '',
    refreshToken: '',
  },
  followingList: [],
  followerList: [],
  isLoding: false,
  followState: false,
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
    [logout.fulfilled]: state => {
      state.isAuthenticated = false;
      removeAccessToken();
      removeRefreshToken();
      removeCurrentUser();
    },
    [logout.rejected]: state => {
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
      state.isAuthenticated = true;
      state.currentUser = getCurrentUser();
    },
    [signout.fulfilled]: state => {
      state.isAuthenticated = false;
    },
    [toggleFollow.fulfilled]: (state, action) => {
      state.followState = action.payload.followState;
    },
    [fetchFollowState.fulfilled]: (state, action) => {
      state.followState = action.payload.followState;
    },
  },
});

export {
  login,
  logout,
  fetchFollowingList,
  fetchFollowerList,
  kakaoLogin,
  findPassword,
  signout,
  toggleFollow,
  fetchFollowState,
};

export const { fetchCurrentUser, checkLogin, toggleIsLoding } = UserSlice.actions;

export default UserSlice.reducer;
