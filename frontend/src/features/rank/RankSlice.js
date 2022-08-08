import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../../api';
import setConfig from '../authHeader';

const fetchRankList = createAsyncThunk('fetchRankList', async (payload, { rejectWithValue }) => {
  try {
    console.log(payload);
    const res = await axios.post(api.fetchRankList(), payload, setConfig());
    console.log(res);
    return res.data;
  } catch (err) {
    console.log(err);
    return rejectWithValue(err.response);
  }
});

const initialState = {
  ranks: [
    {
      userNickname: '',
      address: '',
      calorie: 0,
      date: '',
    },
  ],
  message: '',
};

export const RankSlice = createSlice({
  name: 'rank',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchRankList.fulfilled]: (state, action) => {
      state.ranks = action.payload?.ranks;
      state.message = action.payload?.message;
    },
  },
});

export { fetchRankList };

export const {} = RankSlice.actions;

export default RankSlice.reducer;
