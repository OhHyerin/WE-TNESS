import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../../api';
import setConfig from '../authHeader';

const fetchNotice = createAsyncThunk('fetchNotice', async (payload, { rejectWithValue }) => {
  try {
    const res = await axios.get(api.fetchNotice(), setConfig());
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err);
    return rejectWithValue(err.response);
  }
});

const checkNotice = createAsyncThunk('checkNotice', async (payload, { rejectWithValue }) => {
  console.log(payload);
  try {
    const res = await axios.post(api.checkNotice(), payload, setConfig());
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err);
    return rejectWithValue(err.response);
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
      console.log('hi');
      state.notices = action.payload.notices;
    },
    [checkNotice.fulfilled]: (state, action) => {
      if (action.payload.status === 200) {
        console.log('success');
        fetchNotice();
      } else {
        console.log('fail');
      }
    },
  },
});

export { fetchNotice, checkNotice };

export const {} = NoticeSlice.actions;

export default NoticeSlice.reducer;
