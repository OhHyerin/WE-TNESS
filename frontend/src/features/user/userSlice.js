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

<<<<<<< HEAD
const fetchFollowList = createAsyncThunk(
  'fetchFollowList',
  async (payload, { rejectWithValue }) => {
    const {nickname} = payload
    try {
      const response = await axios.get(api.fetchFollowList(nickname));
      return response;
    } catch (err) {
      return rejectWithValue(err.response);
=======
const petchHistory = createAsyncThunk(
  'petchHistory',
  async () => {
    try {
      const response = await axios.get();
      return response
    } catch (err) {
      return null
>>>>>>> 9e526caddbc226e0daf7f5790bd8861bdcfbd286
    }
  }
)

const initialState = {
  currentUser: {},
  followList: {},
  isAuthenticated: false,
  isAdmin: false,
  isPossibleNickname: false,
  isLoading: false,
  addressCode: '',
  history: {
    getAwardList: [1, 2]
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    testLogin: state => {
      state.isAuthenticated = !state.isAuthenticated
    },
    fetchAddressCode: (state, action) => {
      state.addressCode = action.payload
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
    [login.fulfilled]: state => {
      state.isAuthenticated = true;
    },
    [login.rejected]: state => {
      state.isAuthenticated = false;
    },
    [logout.fulfilled]: state => {
      state.isAuthenticated = false;
    },
    [checkNickname.fulfilled]: state => {
      state.isPossibleNickName = true;
    },
    [checkNickname.rejected]: state => {
      state.isPossibleNickName = false;
    },
<<<<<<< HEAD
    [fetchFollowList.fulfilled]: (state, action) => {
      state.followList = action.payload
=======
    [petchHistory.fulfilled]: (state, action) => {
      state.history = action.payload.data;
>>>>>>> 9e526caddbc226e0daf7f5790bd8861bdcfbd286
    }
  },
});

<<<<<<< HEAD
export { login, logout, signup, checkNickname, fetchFollowList }
export const { testLogin, fetchAddressCode } = userSlice.actions;
=======
export { login, logout, signup, checkNickname, petchHistory }
export const { testLogin, petchAddressCode } = userSlice.actions;
>>>>>>> 9e526caddbc226e0daf7f5790bd8861bdcfbd286

export default userSlice.reducer;