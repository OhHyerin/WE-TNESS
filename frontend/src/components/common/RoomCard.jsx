import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import styled from 'styled-components';
import { Box, Modal, TextField, Grid, styled as styledC, Paper } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import FormBox from '../../components/common/auth/FormBox';
import InputBox from '../../components/common/auth/InputBox';
import SubmitBtn from '../../components/common/SubmitBtn';
import { joinRoom, setNowRoom } from '../../features/room/RoomSlice';
import workoutItems from '../../assets/data/workoutItems';
import squat from '../../assets/images/card/squatCardImg.gif';
import pushup from '../../assets/images/card/pushupCardImg.gif';
import burpee from '../../assets/images/card/burpeeCardImg.gif';
import lunge from '../../assets/images/card/lungeCardImg.gif';

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
  top: '30px',
  right: '30px',
  '&:hover': {
    cursor: 'pointer',
    opacity: '80%',
  },
};

const WorkoutImgBox = styled.div`
  display: flex;
  align-items: center;
`;

const WorkoutImg = styled.img`
  width: 100%;
`;

const Item = styledC(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function RoomCard(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { headcount, workoutId, title, managerNickname, locked, isGaming } = props.room;
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);

  const [password, setPassword] = useState('');
  const [isJoinRoom, setIsJoinRoom] = useState(false);

  const workoutName = function () {
    switch (workoutId) {
      case 1: {
        return '스쿼트';
      }
      case 2: {
        return '팔굽혀펴기';
      }
      case 3: {
        return '버피';
      }
      case 4: {
        return '런지';
      }
      default: {
        return '운동 정보 없음';
      }
    }
  };

  const workoutImg = function () {
    switch (workoutId) {
      case 1: {
        return <CardMedia component="img" height="50" image={squat} alt="" />;
      }
      case 2: {
        return <CardMedia component="img" height="50" image={pushup} alt="" />;
      }
      case 3: {
        return <CardMedia component="img" height="50" image={burpee} alt="" />;
      }
      case 4: {
        return <CardMedia component="img" height="50" image={lunge} alt="" />;
      }
      default: {
        return <p>운동 정보 없음</p>;
      }
    }
  };

  // 비밀방 비밀번호 입력
  function onPasswordHandler(e) {
    e.preventDefault();
    setPassword(e.target.value);
  }

  // 방 입장
  function onJoinRoom(e) {
    const roomInfo = {
      title,
      locked,
      workoutId,
    };
    dispatch(setNowRoom(roomInfo));
    e.preventDefault();
    const payload = {
      title: props.room.title,
      password,
    };
    dispatch(joinRoom(payload)).then(res => navigate('/room'));
  }
  return (
    <>
      <Card sx={{ maxWidth: 345, minWidth: 300 }}>
        {workoutImg()}
        <CardContent>
          {locked ? (
            <Typography gutterBottom variant="h5" component="div">
              비밀방 {title}
            </Typography>
          ) : (
            <Typography gutterBottom variant="h5" component="div">
              공개방 {title}
            </Typography>
          )}

          <>
            <Typography variant="body2" color="text.secondary">
              {workoutName()}
            </Typography>
            {isGaming ? (
              <Typography variant="body2" color="text.secondary">
                진행중
              </Typography>
            ) : (
              <Typography variant="body2" color="text.secondary">
                대기중
              </Typography>
            )}
            <Typography variant="body2" color="text.secondary">
              {headcount} / 6{' '}
            </Typography>
          </>
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
            <p style={{ fontSize: 'xx-large', fontWeight: 'bold' }}>방 입장하기</p>
            <SubmitForm onSubmit={onJoinRoom}>
              <Grid container spacing={2} sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', gap: '15px' }}>
                <Grid item xs={5}>
                  <Item
                    sx={{
                      width: '100%',
                      height: '400px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <p style={{ fontSize: 'x-large', fontWeight: 'bold', paddingBottom: '30px' }}>{workoutName()}</p>
                    <WorkoutImgBox>
                      {workoutItems.map(workout => {
                        if (workout.id === workoutId) {
                          return <WorkoutImg key={workout.id} src={workout.img} alt="workout.id번 운동" />;
                        } else {
                          return null;
                        }
                      })}
                    </WorkoutImgBox>
                  </Item>
                </Grid>

                <Grid item xs={5} style={{ padding: '20px' }}>
                  <Item
                    sx={{
                      width: '100%',
                      height: '400px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-around',
                      gap: '20px',
                    }}>
                    <div style={{ alignSelf: 'self-start' }}>
                      <p style={{ fontSize: 'large', fontWeight: 'bold' }}>
                        {locked ? '[비밀방]' : '[공개방]'} {title}
                      </p>
                    </div>
                    <div style={{ alignSelf: 'self-start', fontSize: 'large', fontWeight: 'bold' }}>
                      <p>방장 : {managerNickname}</p>
                    </div>
                    <div style={{ alignSelf: 'self-start', fontSize: 'large', fontWeight: 'bold' }}>
                      <p>{isGaming ? '게임중' : '대기중'}</p>
                    </div>
                    <div style={{ alignSelf: 'self-start', fontSize: 'large', fontWeight: 'bold' }}>
                      <p>인원 : {headcount} / 6 </p>
                    </div>
                    {locked ? (
                      <InputBox>
                        <TextField label="방 비밀번호" value={password} onChange={onPasswordHandler} />
                      </InputBox>
                    ) : null}
                  </Item>
                </Grid>
                <Grid item xs={10} style={{ padding: '20px', display: 'flex' }}>
                  <SubmitBtn style={{ width: '100%' }}>방 입장하기</SubmitBtn>
                </Grid>
              </Grid>
            </SubmitForm>
          </FormBox>
        </Box>
      </Modal>
    </>
  );
}
