import { List } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import RoomCard from '../common/RoomCard';

export default function SearchRoomList() {
  const searchRoomResult = useSelector(state => state.room.searchRoomResult);
  const showPrivate = useSelector(state => state.room.showPrivate);
  const workout = useSelector(state => state.room.workout);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>검색된 방 목록</h2>
      <List>
        {searchRoomResult.map(room =>
          (room.scope === 'public' || showPrivate) && (workout === '전체' ? true : workout === room.workout) ? (
            <RoomCard room={room} />
          ) : null
        )}
      </List>
    </div>
  );
}
