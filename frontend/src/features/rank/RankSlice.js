import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../../api';
import setConfig from '../authHeader';

const fetchRankList = createAsyncThunk('fetchRankList', async (payload, { rejectWithValue }) => {
  try {
    const res = await axios.post(api.fetchRankList(), payload, setConfig());
    console.log(res);
    return res.data;
  } catch (err) {
    console.log(err);
    return rejectWithValue(err.response);
  }
});

const initialState = {
  workoutIds: [],
  rankList: [
    {
      rank: '1',
      nickname: 'gg',
      calories: '100',
    },
  ],
  region: '',
  isRegion: false,
};

export const RankSlice = createSlice({
  name: 'rank',
  initialState,
  reducers: {
    toggleIsRegion: state => {
      state.isRegion = !state.isRegion;
    },
  },
  extraReducers: {
    [fetchRankList.fulfilled]: (state, action) => {
      state.rankList = action.payload?.rankList;
      state.region = action.payload?.region;
    },
  },
});

export { fetchRankList };

export const { toggleIsRegion } = RankSlice.actions;

export default RankSlice.reducer;
