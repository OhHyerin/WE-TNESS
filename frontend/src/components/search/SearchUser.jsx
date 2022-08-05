import { List } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

export default function SearchRoomList() {
  const searchUserResult = useSelector(state => state.room.searchUserResult);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>검색된 유저 목록</h2>
      <List>
        {searchUserResult.map(user => (
          //   유저 정보를 보여줄 유저 카드 만들면 좋겠다
          <div>{user}</div>
        ))}
      </List>
    </div>
  );
}
