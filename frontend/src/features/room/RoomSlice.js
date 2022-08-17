import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../../api';
import setConfig from '../authHeader';
import { getSessionInfo, setSessionInfo } from '../Token';

const initialState = {
  rooms: [],
  searchRoomResult: [],
  searchUserResult: [],
  workout: 0,
  showPrivate: false,
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
  isRoom: false,

  // 네비바 방 정보 표시
  nowRoom: {},
};

const fetchRoomList = createAsyncThunk('fetchRoomList', async (arg, { rejectWithValue }) => {
  try {
    const res = await axios.get(api.fetchRoomList(), setConfig());
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
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const createRoom = createAsyncThunk('createRoom', async (payload, { rejectWithValue }) => {
  try {
    const res = await axios.post(api.createRoom(), payload, setConfig());
    setSessionInfo(res.data);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const joinRoom = createAsyncThunk('joinRoom', async (payload, { rejectWithValue }) => {
  try {
    const res = await axios.post(api.joinRoom(), payload, setConfig());
    setSessionInfo(res.data);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const searchUser = createAsyncThunk('searchUser', async (arg, { rejectWithValue }) => {
  try {
    const res = await axios.get(api.searchUser(arg.keyword), setConfig());
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
    setIsRoom: (state, action) => {
      state.isRoom = action.payload;
    },
    setNowRoom: (state, action) => {
      state.nowRoom = action.payload;
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
    [searchUser.fulfilled]: (state, action) => {
      state.searchUserResult = action.payload.users;
    },
  },
});

export { fetchRoomList, getWorksouts, searchRooms, createRoom, joinRoom, searchUser };

export const {
  testWorkout,
  testShowPrivate,
  workoutChange,
  setKeyword,
  setIsSearch,
  setIsRoom,
  setNowRoom,
  fetchWorkoutId,
  fetchTitle,
  fetchPassword,
} = RoomSlice.actions;

export default RoomSlice.reducer;
