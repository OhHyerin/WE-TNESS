import { List } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import RoomCard from '../common/RoomCard';
import { searchRooms } from '../../features/room/RoomSlice';

export default function SearchRoomList() {
  const searchRoomResult = useSelector(state => state.room.searchRoomResult);
  const showPrivate = useSelector(state => state.room.showPrivate);
  const workout = useSelector(state => state.room.workout);
  const keyword = useSelector(state => state.room.keyword);
  const dispatch = useDispatch();

  useEffect(() => {
    const payload = {
      keyword,
    };
    dispatch(searchRooms(payload));
  }, [keyword]);

  return (
    <div>
      <h2>검색된 방 목록</h2>
      {searchRoomResult.length > 0 ? (
        <List>
          {searchRoomResult.map(room =>
            room.locked === showPrivate && (workout === 0 ? true : workout === room.workoutId) ? (
              <RoomCard room={room} />
            ) : null
          )}
        </List>
      ) : (
        <div>검색된 방이 없습니다.</div>
      )}
    </div>
  );
}
