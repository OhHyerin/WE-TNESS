import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../../api/index';
import config from '../authHeader';

const fetchHistory = createAsyncThunk('fetchHistory', async (state, { rejectWithValue }) => {
  try {
    const response = await axios.get(api.fetchHistory(), {}, config);
    return response;
  } catch (err) {
    return rejectWithValue(err.response);
  }
});

const initialState = {
  achieveAwards: [1, 3],
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
