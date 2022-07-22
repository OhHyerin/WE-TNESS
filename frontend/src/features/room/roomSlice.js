import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  rooms: {},
  workouts: [],
  searchResult: {},
  workout: '전체',
  showPrivate: true,
  isRoomsLoaded: false,
  isWorkoutsLoaded: false,
  isSearched: false,
};

const getAllRooms = createAsyncThunk('getAllRooms', async (state, { rejectWithValue }) => {
  try {
    const response = await axios.get(``);
    console.log('getAllRooms : ' + response);
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const getWorksouts = createAsyncThunk('getWorkouts', async (state, { rejectWithValue }) => {
  try {
    const response = await axios.get(`/workouts`);
    console.log('workouts : ' + response);
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const searchRooms = createAsyncThunk('searchRooms', async (payload, { rejectWithValue }) => {
  console.log('searchRooms : ' + payload);
  try {
    const { scope, workout } = payload;
    const response = await axios.get(`/search?scope=${scope}&workout=${workout}`);
    console.log('response : ' + response);
    return response;
  } catch (error) {
    return rejectWithValue(error.response);
  }
});

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    testWorkout: state => {
      state.workouts = ['전체', '운동1', '운동2', '운동3'];
    },
    testShowPrivate: state => {
      state.showPrivate = !state.showPrivate;
    },
    testRadioChange: (state, action) => {
      state.workout = action.payload;
    },
  },
  extraReducers: {
    [getAllRooms.pending]: state => {
      state.isRoomsLoaded = false;
    },
    [getAllRooms.fulfilled]: state => {
      state.isRoomsLoaded = true;
    },
    [getAllRooms.rejected]: state => {
      state.isRoomsLoaded = false;
    },
    [getWorksouts.pending]: state => {
      state.isWorkoutsLoaded = false;
    },
    [getWorksouts.fulfilled]: state => {
      state.isWorkoutsLoaded = true;
    },
    [getWorksouts.rejected]: state => {
      state.isWorkoutsLoaded = false;
    },
  },
});

export { getAllRooms, getWorksouts, searchRooms };
export const { testWorkout, testShowPrivate, testRadioChange } = roomSlice.actions;

export default roomSlice.reducer;
