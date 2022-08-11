import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import styled from 'styled-components';
import { Box, Modal, TextField } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import FormBox from '../../components/common/auth/FormBox';
import InputBox from '../../components/common/auth/InputBox';
import SubmitBtn from '../../components/common/SubmitBtn';
import { joinRoom } from '../../features/room/RoomSlice';

const SubmitForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  gap: 10px;
`;

const addStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '1px solid var(--primary-color)',

  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

const closeStyle = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  '&:hover': {
    cursor: 'pointer',
    opacity: '80%',
  },
};

export default function RoomCard(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { handcount, workout, title, managerNickname, locked, isGaming } = props.room;
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);

  const [password, setPassword] = useState('');
  const [isJoinRoom, setIsJoinRoom] = useState(false);

  // 비밀방 비밀번호 입력
  function onPasswordHandler(e) {
    e.preventDefault();
    setPassword(e.target.value);
  }

  // 방 입장
  function onJoinRoom(e) {
    e.preventDefault();
    const payload = {
      title: props.room.title,
      password,
    };
    dispatch(joinRoom(payload)).then(res => {
      if (res.type === 'joinRoom/fulfilled') {
        navigate('/room');
      }
    });
  }
  return (
    <>
      <Card sx={{ maxWidth: 345, minWidth: 300 }}>
        <CardMedia component="img" height="140" image="" alt="" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {locked ? <p> 비공개방 {title}</p> : '공개방'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {workout}
            <br />
            {isGaming ? '진행중' : '대기중'}
            <br />
            {handcount} / 6
          </Typography>
        </CardContent>
        <CardActions>
          {isAuthenticated ? (
            <Button
              onClick={() => {
                setIsJoinRoom(true);
              }}
              size="small">
              입장
            </Button>
          ) : null}
        </CardActions>
      </Card>
      {/* 방 입장 모달 */}
      <Modal open={isJoinRoom} onClose={() => setIsJoinRoom(false)}>
        <Box sx={addStyle}>
          <ClearIcon sx={closeStyle} onClick={() => setIsJoinRoom(false)}></ClearIcon>
          <FormBox>
            <SubmitForm onSubmit={onJoinRoom}>
              <p>운동 종류 : {workout}</p>
              <p>방 제목: {title}</p>
              <p>방장 : {managerNickname}</p>
              <p>상태 :{isGaming ? '게임중' : '대기중'}</p>
              <p>인원 : {handcount} / 6 </p>
              {locked ? (
                <InputBox>
                  <TextField label="방 비밀번호" value={password} onChange={onPasswordHandler} />
                </InputBox>
              ) : null}
              <SubmitBtn>방 입장하기</SubmitBtn>
            </SubmitForm>
          </FormBox>
        </Box>
      </Modal>
    </>
  );
}
