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
    return rejectWithValue(err.response.data);
  }
});

const fetchDiary = createAsyncThunk('fetchDiary', async (payload, { rejectWithValue }) => {
  const { nickname } = payload;
  try {
    const res = await axios.get(api.fetchDiary(nickname), setConfig());
    console.log(res.data);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

const initialState = {
  achieveAwards: [{ award: 'login_1', receiveDate: '2022-08-10T11:43:17' }],
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
      login: false,
    },
    {
      date: 'tue',
      value: '',
      login: false,
    },
    {
      date: 'wed',
      value: '',
      login: false,
    },
    {
      date: 'thu',
      value: '',
      login: false,
    },
    {
      date: 'fri',
      value: '',
      login: false,
    },
    {
      date: 'sat',
      value: '',
      login: false,
    },
    {
      date: 'sun',
      value: '',
      login: false,
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
    [fetchDiary.fulfilled]: (state, action) => {
      state.diaryPhotos = action.payload;
    },
  },
});

export { fetchHistory, fetchDiary };

export const {} = HistorySlice.actions;

export default HistorySlice.reducer;
