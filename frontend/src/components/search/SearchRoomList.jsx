import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import styled from 'styled-components';
import RoomCard from '../common/RoomCard';
import { searchRooms } from '../../features/room/RoomSlice';

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-top: 50px;
  gap: 20px;
`;

const NoRoomBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
  font-size: large;
`;

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
  }, [dispatch, keyword]);

  return (
    <div>
      {searchRoomResult.length > 0 ? (
        <List>
          {searchRoomResult.map((room, i) =>
            room.locked === showPrivate && (workout === 0 ? true : workout === room.workoutId) ? (
              <RoomCard key={i} room={room} />
            ) : null
          )}
        </List>
      ) : (
        <NoRoomBox>검색된 방이 없습니다.</NoRoomBox>
      )}
    </div>
  );
}
