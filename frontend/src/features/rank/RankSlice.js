import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../../api';
import setConfig from '../authHeader';

const fetchRankList = createAsyncThunk('fetchRankList', async (payload, { rejectWithValue }) => {
  try {
    const res = await axios.post(api.fetchRankList(), payload, setConfig());
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

const fetchTotalRanking = createAsyncThunk('fetchRankList', async (payload, { rejectWithValue }) => {
  try {
    const res = await axios.post(api.fetchRankList(), payload, setConfig());
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

const fetchSquatRanking = createAsyncThunk('fetchRankList', async (payload, { rejectWithValue }) => {
  try {
    const res = await axios.post(api.fetchRankList(), payload, setConfig());
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

const fetchPushupRanking = createAsyncThunk('fetchRankList', async (payload, { rejectWithValue }) => {
  try {
    const res = await axios.post(api.fetchRankList(), payload, setConfig());
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

const fetchBurpeeRanking = createAsyncThunk('fetchRankList', async (payload, { rejectWithValue }) => {
  try {
    const res = await axios.post(api.fetchRankList(), payload, setConfig());
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

const fetchLungeRanking = createAsyncThunk('fetchRankList', async (payload, { rejectWithValue }) => {
  try {
    const res = await axios.post(api.fetchRankList(), payload, setConfig());
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

const initialState = {
  ranks: [],
  message: '',

  // 메인페이지 실시간 랭킹
  previewRank: {},
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
    [fetchTotalRanking.fulfilled]: (state, action) => {
      state.previewRank.total = action.payload?.ranks;
    },
    [fetchSquatRanking.fulfilled]: (state, action) => {
      state.previewRank.squat = action.payload?.ranks;
    },
    [fetchPushupRanking.fulfilled]: (state, action) => {
      state.previewRank.pushup = action.payload?.ranks;
    },
    [fetchBurpeeRanking.fulfilled]: (state, action) => {
      state.previewRank.burpee = action.payload?.ranks;
    },
    [fetchLungeRanking.fulfilled]: (state, action) => {
      state.previewRank.lunge = action.payload?.ranks;
    },
  },
});

export {
  fetchRankList,
  fetchTotalRanking,
  fetchSquatRanking,
  fetchPushupRanking,
  fetchBurpeeRanking,
  fetchLungeRanking,
};

export const {} = RankSlice.actions;

export default RankSlice.reducer;
