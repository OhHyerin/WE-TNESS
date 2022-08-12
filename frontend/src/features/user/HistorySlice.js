import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../../api/index';
import setConfig from '../authHeader';

const fetchHistory = createAsyncThunk('fetchHistory', async (payload, { rejectWithValue }) => {
  const { nickname } = payload;
  try {
    const res = await axios.get(api.fetchHistory(nickname), setConfig());
    console.log(res);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response);
  }
});

const initialState = {
  achieveAwards: [1, 3],
  heatMapList: [],
  matches: {
    bronze: 0,
    gold: 0,
    silver: 0,
    totalCnt: 0,
  },
  todayCalories: '',
  weeklyCalories: [
    {
      date: 'mon',
      value: '',
    },
    {
      date: 'tue',
      value: '',
    },
    {
      date: 'wed',
      value: '',
    },
    {
      date: 'thu',
      value: '',
    },
    {
      date: 'fri',
      value: '',
    },
    {
      date: 'sat',
      value: '',
    },
    {
      date: 'sun',
      value: '',
    },
  ],
  diaryPhotos: [],
};

export const HistorySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchHistory.fulfilled]: (state, action) => {
      state.achieveAwards = action.payload.award;
      state.heatMapList = action.payload.heatMapList;
      state.matches = action.payload.medal;
      state.todayCalorie = action.payload.todayCalorie;
      state.weeklyCalories = action.payload.weeklyRecords;
    },
  },
});

export { fetchHistory };
export const {} = HistorySlice.actions;

export default HistorySlice.reducer;
