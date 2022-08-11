import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../../api';
import setConfig from '../authHeader';
import { getSessionInfo, setSessionInfo } from '../Token';

const initialState = {
  rooms: [],
  searchRoomResult: [],
  searchUserResult: [],
  workout: '전체',
  showPrivate: true,
  isRoomsLoaded: false,
  isWorkoutsLoaded: false,
  isSearched: false,
  isLoading: false,

  // 방 생성 관련
  roomInfo: {
    title: '',
    workoutId: 1,
    password: '',
  },

  // 방 생성 입장 관련
  sessionInfo: {},
  keyword: '',
};

const fetchRoomList = createAsyncThunk('fetchRoomList', async (arg, { rejectWithValue }) => {
  try {
    const res = await axios.get(api.fetchRoomList(), setConfig());
    console.log(res);
    console.log(res.data);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

const getWorksouts = createAsyncThunk('getWorkouts', async (state, { rejectWithValue }) => {
  try {
    const response = await axios.get(`/workouts`);
    console.log(response);
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const searchRooms = createAsyncThunk('searchRooms', async (arg, { rejectWithValue }) => {
  console.log(arg);
  try {
    const res = await axios.get(api.searchRooms(arg.keyword), setConfig());
    console.log(res.data);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const createRoom = createAsyncThunk('createRoom', async (payload, { rejectWithValue }) => {
  console.log(payload);
  try {
    const res = await axios.post(api.createRoom(), payload, setConfig());
    console.log(res.data);
    setSessionInfo(res.data);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const joinRoom = createAsyncThunk('joinRoom', async (payload, { rejectWithValue }) => {
  console.log(payload);
  try {
    const res = await axios.post(api.joinRoom(), payload, setConfig());
    console.log(res.data);
    setSessionInfo(res.data);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const RoomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
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
    fetchWorkoutId: (state, action) => {
      state.roomInfo.workoutId = action.payload;
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
    [createRoom.fulfilled]: state => {
      state.sessionInfo = getSessionInfo();
    },
    [joinRoom.fulfilled]: state => {
      state.sessionInfo = getSessionInfo();
    },
    [searchRooms.fulfilled]: (state, action) => {
      state.searchRoomResult = action.payload;
    },
  },
});

export { fetchRoomList, getWorksouts, searchRooms, createRoom, joinRoom };

export const {
  testWorkout,
  testShowPrivate,
  workoutChange,
  testRoomList,
  setKeyword,
  setIsSearch,
  fetchWorkoutId,
  fetchTitle,
  fetchPassword,
} = RoomSlice.actions;

export default RoomSlice.reducer;
