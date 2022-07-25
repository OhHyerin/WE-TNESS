import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { testRoomList } from '../../features/room/RoomSlice';
import RoomCard from '../common/RoomCard';

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default function RoomList() {
  const rooms = useSelector(state => state.room.rooms);
  const showPrivate = useSelector(state => state.room.showPrivate);
  const workout = useSelector(state => state.room.workout);

  const dispatch = useDispatch();
  const handleAddTest = () => {
    dispatch(testRoomList());
  };

  return (
    <div>
      <h2>방 리스트</h2>
      <button onClick={handleAddTest}>add test</button>
      <List>{rooms.map(room => (room.scope === 'public' || showPrivate ? <RoomCard room={room} /> : null))}</List>
    </div>
  );
}
