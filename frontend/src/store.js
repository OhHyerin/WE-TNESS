import { configureStore } from '@reduxjs/toolkit';
import UserReducer from './features/user/UserSlice.js';
import RoomReducer from './features/room/RoomSlice.js';
import SignupReducer from './features/user/SignupSlice.js';
import HistoryReducer from './features/user/HistorySlice.js';
import EditReducer from './features/user/EditSlice.js';
import RankReducer from './features/rank/RankSlice.js'

const store = configureStore({
  reducer: {
    room: RoomReducer,
    user: UserReducer,
    signup: SignupReducer,
    history: HistoryReducer,
    edit: EditReducer,
    rank: RankReducer,
  },
});

export default store;
