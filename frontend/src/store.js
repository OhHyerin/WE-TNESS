import { configureStore } from '@reduxjs/toolkit';
import UserReducer from './features/user/UserSlice.js';
import RoomReducer from './features/room/RoomSlice.js';
import SignupReducer from './features/user/SignupSlice.js';
import HistoryReducer from './features/user/HistorySlice.js';

const store = configureStore({
  reducer: {
    room: RoomReducer,
    user: UserReducer,
    signup: SignupReducer,
    history: HistoryReducer,
  },
});

export default store;
