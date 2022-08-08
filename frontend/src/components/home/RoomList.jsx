import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useEffect } from 'react';
import { fetchRoomList, testRoomList } from '../../features/room/RoomSlice';
import RoomCard from '../common/RoomCard';

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default function RoomList() {
  const rooms = useSelector(state => state.room.rooms);
  const showPrivate = useSelector(state => state.room.showPrivate);
  const workout = useSelector(state => state.room.workout);
  const isRoomsLoaded = useSelector(state => state.room.isRoomsLoaded);

  const dispatch = useDispatch();
  const handleAddTest = () => {
    dispatch(testRoomList());
  };

  useEffect(() => {
    console.log('방 리스트 로드');
    dispatch(fetchRoomList());
  }, []);

  return (
    <div>
      <h2>방 리스트</h2>
      <button onClick={handleAddTest}>add test</button>
      {isRoomsLoaded ? (
        // 룸 리스트가 로드된 경우 => 룸 리스트 개수에 따라서 처리
        rooms.length === 0 ? (
          <div>"룸 리스트가 비었어요."</div>
        ) : (
          <List>
            {rooms.map(room =>
              (room.scope === 'public' || showPrivate) && (workout === '전체' ? true : workout === room.workout) ? (
                <RoomCard room={room} />
              ) : null
            )}
          </List>
        )
      ) : (
        <div>"룸 리스트가 로드되지 않았습니다."</div>
      )}
    </div>
  );
}
