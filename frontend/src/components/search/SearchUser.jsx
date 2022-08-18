import { useSelector, useDispatch } from 'react-redux';
import { searchUser } from '../../features/room/RoomSlice';
import { useEffect } from 'react';
import { Avatar } from '@mui/material';
import styled from 'styled-components';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useNavigate } from 'react-router-dom';

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const NameTag = styled.div`
  margin: 10px;
  padding: 10px;
  width: 256px;
  height: 64px;
  border-radius: 10px;
  box-shadow: 0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%);
  display: flex;
  align-items: center;
  cursor: pointer;
`;
const Nickname = styled.div`
  font-weight: bold;
  font-size: large;
  padding: 0px 10px;
`;
const SubText = styled.div`
  font-size: small;
  padding: 5px 10px 0px 10px;
`;
const TextBox = styled.div`
  display: flex;
  flex-direction: column;
`;
const ArrowBtn = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: end;
`;

export default function SearchRoomList() {
  const searchUserResult = useSelector(state => state.room.searchUserResult);
  const keyword = useSelector(state => state.room.keyword);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(searchUser({ keyword }));
    console.log(searchUserResult);
  }, [keyword]);

  return (
    <div>
      <h2>검색된 유저 목록</h2>
      <List>
        {searchUserResult.map((user, idx) => (
          <NameTag key={idx} onClick={() => navigate(`/history/${user.nickname}`)}>
            <Avatar sx={{ width: 44, height: 44 }}>{user.nickname.substr(0, 2)}</Avatar>
            <TextBox>
              <Nickname>{user.nickname}</Nickname>
              {user.address ? <SubText>{user.address}</SubText> : <SubText>주소없음</SubText>}
            </TextBox>
            <ArrowBtn>
              <KeyboardArrowRightIcon />
            </ArrowBtn>
          </NameTag>
        ))}
      </List>
    </div>
  );
}
