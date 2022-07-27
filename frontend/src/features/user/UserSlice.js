import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setAccessToken, removeAccessToken, setRefreshToken, removeRefreshToken } from '../Token';
import api from '../../api/index';
import header from '../authHeader';

const login = createAsyncThunk('login', async (payload, { rejectWithValue }) => {
  try {
    const res = await axios.post(api.login(), payload);
    setAccessToken(res.data.accessToken);
    setRefreshToken(res.data.refreshToken);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response);
  }
});

const logout = createAsyncThunk('logout', async (state, { rejectWithValue }) => {
  try {
    const config = {
      headers: header,
    };
    const res = await axios.post(api.logout(), {}, config);
    removeAccessToken();
    removeRefreshToken();
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
  try {
    const response = await axios.post(api.kakao(), payload);
    return response;
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
    const response = await axios.post(api.findPassword(), payload);
    return response;
  } catch (err) {
    return rejectWithValue(err.response);
  }
});

const initialState = {
  loginUser: {},
  kakaoInfo: {
    exist_user: false,
    jwt: '',
    original_nickname: '',
  },
  isModal: false,
  followList: {},
  isAuthenticated: false,
  isAdmin: false,
  isLoading: false,
  history: {
    getAwardList: [1, 2],
  },
};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    testLogin: state => {
      state.isAuthenticated = !state.isAuthenticated;
    },
    toggleIsModal: state => {
      state.isModal = !state.isModal;
    },
    checkLogin: state => {
      state.isAuthenticated = true;
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.isAuthenticated = true;
      state.loginUser = action.userInfo;
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
export const { testLogin, toggleIsModal, checkLogin } = UserSlice.actions;

export default UserSlice.reducer;
