import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'
import { setToken, removeToken } from '../Token';
import api from '../../api/index'

const login = createAsyncThunk(
  'login',
  async (payload, { rejectWithValue }) => {
    console.log(payload)
    try {
      const response = await axios.post(api.login(), payload);
      console.log(response)
      // setToken()
      return response;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

const logout = createAsyncThunk(
  'logout',
  async (state, { rejectWithValue }) => {
    try {
      const response = await axios.post(api.logout());
      removeToken();
      return response;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

const fetchFollowList = createAsyncThunk(
  'fetchFollowList',
  async (payload, { rejectWithValue }) => {
    const {nickname} = payload
    try {
      const response = await axios.get(api.fetchFollowList());
      return response;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
)

const fetchHistory = createAsyncThunk(
  'fetchHistory',
  async (state, { rejectWithValue }) => {
    try {
      const response = await axios.get(api.fetchHistory());
      return response
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
)

const kakaoLogin = createAsyncThunk(
  'kakaoLogin',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(api.kakao(), payload)
      return response
    } catch (err) {
      return rejectWithValue(err.response); 
    }
  }
)

const edit = createAsyncThunk(
  'edit',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(api.edit(), payload)
      return response
    } catch (err) {
      return rejectWithValue(err.response); 
    }
  }
)

const initialState = {
  currentUser: {},
  kakaoInfo: {
    exist_user: false,
    jwt : "",
	  original_nickname : "",
  },
  isModal: false,
  followList: {},
  isAuthenticated: false,
  isAdmin: false,
  isLoading: false,
  history: {
    getAwardList: [1, 2]
  },
};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    testLogin: state => {
      state.isAuthenticated = !state.isAuthenticated
    },
    toggleIsModal: state => {
      state.isModal = !state.isModal
    }
  },
  extraReducers: {
    [login.fulfilled]: state => {
      state.isAuthenticated = true;
    },
    [login.rejected]: state => {
      state.isAuthenticated = false;
    },
    [logout.fulfilled]: state => {
      state.isAuthenticated = false;
    },
    [fetchFollowList.fulfilled]: (state, action) => {
      state.followList = action.payload
    },
    [kakaoLogin.fulfilled]: (state, action) => {
      state.kakaoInfo = action.payload
    },
  },
});

export { login, logout, fetchFollowList, fetchHistory, kakaoLogin, edit }
export const { testLogin, toggleIsModal } = UserSlice.actions;

export default UserSlice.reducer;