import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../../api/index';
import setConfig from '../authHeader';

const fetchHistory = createAsyncThunk('fetchHistory', async (arg, { rejectWithValue }) => {
  try {
    const response = await axios.get(api.fetchHistory(), {}, setConfig());
    return response;
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
    },
  },
  extraReducers: {},
});

export { fetchHistory };

export default HistorySlice.reducer;
