import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice.js';
import RoomReducer from './features/room/RoomSlice.js';

const store = configureStore({
  reducer: {
    room: RoomReducer,
    user: userReducer,
  },
});

export default store;
