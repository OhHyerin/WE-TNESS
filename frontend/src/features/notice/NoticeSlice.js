import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../../api';
import setConfig from '../authHeader';

const fetchNotice = createAsyncThunk('fetchNotice', async (arg, { rejectWithValue }) => {
  try {
    const res = await axios.get(api.fetchNotice(), setConfig());
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

const checkNotice = createAsyncThunk('checkNotice', async (payload, { rejectWithValue }) => {
  try {
    const res = await axios.post(api.checkNotice(), payload, setConfig());
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

const initialState = {
  notices: [
    // {
    //     "id": 1,
    //     "type": "invite",
    //     "sender": "qwer4",
    //     "roomCode": "1004",
    //     "sendDate": "2022-08-04T17:06:24",
    //     "badge": null
    // },
  ],
};

export const NoticeSlice = createSlice({
  name: 'notice',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchNotice.fulfilled]: (state, action) => {
      state.notices = action.payload.notices;
    },
    [checkNotice.fulfilled]: (state, action) => {
      if (action.payload.status === 200) {
        fetchNotice();
      }
    },
  },
});

export { fetchNotice, checkNotice };

export default NoticeSlice.reducer;
