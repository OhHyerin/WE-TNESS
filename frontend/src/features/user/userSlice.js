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
      const response = await axios.get(api.fetchFollowList(nickname));
      return response;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
)

const fetchHistory = createAsyncThunk(
  'fetchHistory',
  async () => {
    try {
      const response = await axios.get();
      return response
    } catch (err) {
      return null
    }
  }
)

const initialState = {
  currentUser: {},
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
    }
  },
});

export { login, logout, fetchFollowList, fetchHistory }
export const { testLogin } = UserSlice.actions;

export default UserSlice.reducer;