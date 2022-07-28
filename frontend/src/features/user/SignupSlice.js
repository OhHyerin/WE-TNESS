import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../../api/index';

const signup = createAsyncThunk('signup', async (payload, { rejectWithValue }) => {
  try {
    const res = await axios.post(api.signup(), payload);
    console.log(res);
    return res;
  } catch (err) {
    console.log(err);
    return rejectWithValue(err.response);
  }
});

const checkNickname = createAsyncThunk('checkNickname', async (payload, { rejectWithValue }) => {
  const nickname = payload;
  try {
    const res = await axios.get(api.checkNickname(nickname));
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response);
  }
});

const checkEmail = createAsyncThunk('checkEmail', async (payload, { rejectWithValue }) => {
  const email = payload;
  try {
    const res = await axios.get(api.checkEmail(email));
    return res.data;
  } catch (err) {
    console.log(err);
    return rejectWithValue(err.response);
  }
});

const addInfo = createAsyncThunk('addInfo', async (payload, { rejectWithValue }) => {
  console.log(payload)
  try {
    const res = await axios.get(api.addInfo(payload));
    console.log(res)
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response);
  }
});

const fetchUserInfo = createAsyncThunk('fetchUserInfo', async (payload, { rejectWithValue }) => {
  try {
    const response = await axios.get(api.fetchUserInfo());
    return response;
  } catch (err) {
    return rejectWithValue(err.response);
  }
});

const changePassword = createAsyncThunk('changePassword', async (payload, { rejectWithValue }) => {
  try {
    const response = await axios.get(api.changePassword());
    return response;
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
    gender: '',
    addressCode: '',
    weight: '',
    height: '',
  },
  isModal: false,
  isPossibleNickname: false,
  isPossibleEmail: false,
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
    fetchGender: (state, action) => {
      state.userInfo.gender = action.payload;
    },
    fetchAddressCode: (state, action) => {
      state.userInfo.addressCode = action.payload;
    },
    fetchHeight: (state, action) => {
      state.userInfo.height = action.payload;
    },
    fetchWeight: (state, action) => {
      state.userInfo.weight = action.payload;
    },
    toggleIsModal: state => {
      state.isModal = !state.isModal
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
    [checkNickname.fulfilled]: (state, action) => {
      state.isPossibleNickname = action.payload.possible;
    },
    [checkEmail.fulfilled]: (state, action) => {
      state.isPossibleEmail = action.payload.possible;
    },
    [fetchUserInfo.fulfilled]: (state, action) => {
      state.userInfo = action.payload;
    },
    [addInfo.fulfilled]: state => {
      state.isModal = false
    }
  },
});

export { signup, checkNickname, checkEmail, fetchUserInfo, changePassword, addInfo };

export const {
  fetchNickname,
  fetchEmail,
  fetchPassword,
  fetchPwdVerify,
  fetchGender,
  fetchAddressCode,
  fetchHeight,
  fetchWeight,
  toggleIsModal,
} = SignupSlice.actions;

export default SignupSlice.reducer;
