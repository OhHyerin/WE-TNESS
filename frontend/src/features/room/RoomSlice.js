import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../../api';
import setConfig from '../authHeader';

const initialState = {
  rooms: [],
  workouts: [],
  searchRoomResult: [],
  searchUserResult: [],
  workout: '전체',
  showPrivate: true,
  isRoomsLoaded: false,
  isWorkoutsLoaded: false,
  isSearched: false,

  // 방 생성 관련
  roomInfo: {
    title: '',
    workoutId: '',
    password: '',
  },
  keyword: '',
};

const fetchRoomList = createAsyncThunk('fetchRoomList', async (arg, { rejectWithValue }) => {
  try {
    const res = await axios.get(api.fetchRoomList(), setConfig());
    console.log(res);
    console.log(res.data);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response);
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

export const RoomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    testWorkout: state => {
      state.workouts = ['전체', '운동1', '운동2', '운동3'];
    },
    testShowPrivate: state => {
      state.showPrivate = !state.showPrivate;
    },
    workoutChange: (state, action) => {
      state.workout = action.payload;
    },
    testRoomList: state => {
      state.rooms = [
        ...state.rooms,
        { name: 'test1', scope: 'public', workout: '운동1', started: true, numOfPeople: 1 },
        { name: 'test2', scope: 'private', workout: '운동2', started: true, numOfPeople: 2 },
      ];
    },
    fetchTitle: (state, action) => {
      state.roomInfo.title = action.payload;
    },
    fetchPassword: (state, action) => {
      state.roomInfo.password = action.payload;
    },
    setKeyword: (state, action) => {
      state.keyword = action.payload;
    },
    setIsSearch: (state, action) => {
      state.isSearched = action.payload;
    },
  },
  extraReducers: {
    [fetchRoomList.pending]: state => {
      state.isRoomsLoaded = false;
    },
    [fetchRoomList.fulfilled]: (state, action) => {
      state.isRoomsLoaded = true;
      state.rooms = [...action.payload];
    },
    [fetchRoomList.rejected]: state => {
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

export { fetchRoomList, getWorksouts, searchRooms };

export const {
  testWorkout,
  testShowPrivate,
  workoutChange,
  testRoomList,
  setKeyword,
  setIsSearch,
  fetchTitle,
  fetchPassword,
} = RoomSlice.actions;

export default RoomSlice.reducer;
