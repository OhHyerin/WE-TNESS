import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice.js';
import roomReducer from './features/room/roomSlice.js';

const store = configureStore({
  reducer: {
    room: roomReducer,
    user: userReducer,
  },
});

export default store;
