import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../../api/index';
import setConfig from '../authHeader';

const fetchHistory = createAsyncThunk('fetchHistory', async (payload, { rejectWithValue }) => {
  try {
    const res = await axios.post(api.fetchHistory(), payload, setConfig());
    console.log(res);
    return res;
  } catch (err) {
    return rejectWithValue(err.response);
  }
});

const initialState = {
  achieveAwards: [1, 3],
  heatMapList: [],
  matches: {},
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
  reducers: {
    fetchInfo: (state, action) => {
      state.achieveAwards = action.payload.achieveAwards;
      state.heatMapList = action.payload.heatMapList;
      state.weeklyCalories = action.payload.weeklyCalories;
    },
  },
  extraReducers: {},
});

export { fetchHistory };
export const { fetchInfo } = HistorySlice.actions;

export default HistorySlice.reducer;
