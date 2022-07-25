import { configureStore } from '@reduxjs/toolkit';
import UserReducer from './features/user/UserSlice.js';
import roomReducer from './features/room/roomSlice.js';
import SignupReducer from './features/user/SignupSlice.js';

const store = configureStore({
  reducer: {
    room: roomReducer,
    user: UserReducer,
    signup: SignupReducer,
  },
});

export default store;
