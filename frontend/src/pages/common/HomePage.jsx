import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Box, Modal, TextField, Fab, Grid, styled as styledC, Paper, Tooltip } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import ClearIcon from '@mui/icons-material/Clear';
import Banner from '../../components/home/Banner';
import RankingPreview from '../../components/home/RankingPreview';
import RoomList from '../../components/home/RoomList';
import RoomFilter1 from '../../components/home/RoomFilter1';
import RoomFilter2 from '../../components/home/RoomFilter2';
import FormBox from '../../components/common/auth/FormBox';
import InputBox from '../../components/common/auth/InputBox';
import SubmitBtn from '../../components/common/SubmitBtn';
import { checkNickname, addInfo, toggleIsModal } from '../../features/user/SignupSlice';
import {
  fetchTitle,
  fetchPassword,
  createRoom,
  fetchWorkoutId,
  setNowRoom,
  createModal,
} from '../../features/room/RoomSlice';
import { removeSessionInfo } from '../../features/Token';
import workoutItems from '../../assets/data/workoutItems';
import IconTextField from '../../components/common/IconTextField';
import CheckBtn from '../../components/common/CheckBtn';

const HomeBox = styled.div`
  padding-top: 40px;
`;

const ChannelTitle = styled.p`
  font-size: 30px;
`;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 400,
  bgcolor: 'background.paper',
  border: '1px solid var(--primary-color)',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

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

const SubmitForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  gap: 40px;
`;

const fabStyle = {
  position: 'fixed',
  bottom: 16,
  right: 16,
  color: 'white',
  backgroundColor: 'var(--primary-color)',
  '&:hover': {
    bgcolor: 'var(--primary-color)',
    color: '#d5d8d8',
  },
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
  flex-wrap: wrap;
  > img:hover {
    cursor: pointer;
  }
`;

const WorkoutImg = styled.img`
  width: 50%;
  height: 40%;
  border: ${props => (props.active ? '5px double var(--primary-color)' : '')};
  filter: ${props => (props.active ? '' : 'blur(2px) grayscale(90%)')};
  border-radius: 5px;
`;

const Item = styledC(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(state => state.user.isAuthenticated);

  useEffect(() => {
    removeSessionInfo();
  }, []);

  function onCreate(e) {
    const arg = {
      title: roomInfo.title,
      locked: !!roomInfo.password,
      workout: roomInfo.workoutId,
    };
    dispatch(setNowRoom(arg));
    e.preventDefault();
    const payload = {
      workoutId: roomInfo.workoutId,
      title: roomInfo.title,
      password: roomInfo.password,
    };
    dispatch(createModal(false));
    dispatch(createRoom(payload)).then(res => navigate('/room'));
  }

  // 방 생성 관련
  const isCreate = useSelector(state => state.room.isCreate);
  const roomInfo = useSelector(state => state.room.roomInfo);
  function onOpen(e) {
    dispatch(createModal(true));
  }
  function onClose(e) {
    dispatch(createModal(false));
  }
  function onTitleHandler(e) {
    e.preventDefault();
    dispatch(fetchTitle(e.target.value));
  }
  function onWorkoutHandler(workoutId) {
    dispatch(fetchWorkoutId(workoutId));
  }
  function onPasswordHandler(e) {
    e.preventDefault();
    dispatch(fetchPassword(e.target.value));
  }
  function onSubmitRoom(e) {
    e.preventDefault();
  }

  // 추가정보 모달 관련
  const isModal = useSelector(state => state.signup.isModal);
  const isPossibleNickname = useSelector(state => state.user.isPossibleNickname);
  const [nickname, setNickname] = useState('');
  const [isCheckNN, setIsCheckNN] = useState(false);

  // 모달 닫기 테스트버튼
  function handleClose() {
    dispatch(toggleIsModal());
  }

  function onNicknameHandler(e) {
    setNickname(e.target.value);
  }

  function onCheckNicknameHandler(e) {
    e.preventDefault();
    const payload = nickname;
    setIsCheckNN(true);
    dispatch(checkNickname(payload));
  }

  function onSubmitHandler(e) {
    e.preventDefault();
    const payload = nickname;
    dispatch(addInfo(payload))
      .then(() => {})
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <div>
      <HomeBox>
        <Banner />
        {/* 랭킹 프리뷰 버티컬 캐러셀 */}
        <RankingPreview />
        <>
          <ChannelTitle>실시간 채널</ChannelTitle>
          {/* 비밀방 여부 */}
          <RoomFilter2 />
          {/* 운동 목록 */}
          <RoomFilter1 />
        </>
        <RoomList />
      </HomeBox>

      {/* 카카오 로그인 추가정보 입력 모달 */}
      <Modal open={isModal} onClose={handleClose}>
        <Box sx={style}>
          <ClearIcon sx={closeStyle} onClick={handleClose}></ClearIcon>
          <FormBox>
            <SubmitForm onSubmit={onSubmitHandler}>
              <p style={{ fontSize: '25px' }}>추가 정보 입력</p>
              <InputBox>
                <IconTextField
                  error={isCheckNN && !isPossibleNickname}
                  iconStart={<AccountCircle />}
                  iconEnd={
                    nickname ? (
                      <CheckBtn onClick={onCheckNicknameHandler}>확인</CheckBtn>
                    ) : (
                      <CheckBtn disabled deactive={!nickname}>
                        확인
                      </CheckBtn>
                    )
                  }
                  label="*닉네임"
                  value={nickname}
                  onChange={onNicknameHandler}
                  helperText={
                    isCheckNN ? (isPossibleNickname ? '사용 가능한 닉네임입니다.' : '사용중인 닉네임입니다.') : null
                  }
                />
              </InputBox>
              <SubmitBtn disabled={!isCheckNN || !isPossibleNickname} deactive={!isCheckNN || !isPossibleNickname}>
                제출
              </SubmitBtn>
            </SubmitForm>
          </FormBox>
        </Box>
      </Modal>

      {/* 방 생성 모달 */}
      <Modal open={isCreate} onClose={onClose}>
        <Box sx={addStyle}>
          <ClearIcon sx={closeStyle} onClick={onClose}></ClearIcon>
          <FormBox>
            <p style={{ fontSize: 'xx-large', fontWeight: 'bold' }}>방 만들기</p>
            <SubmitForm onSubmit={onSubmitRoom}>
              <Grid container spacing={2} sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', gap: '15px' }}>
                <Grid item xs={5}>
                  <Item sx={{ width: '100%', height: '400px', display: 'flex', flexWrap: 'wrap' }}>
                    <WorkoutImgBox>
                      {workoutItems.map(workout => {
                        if (workout.id !== 0 && workout.img) {
                          return (
                            <Tooltip key={workout.id} title={workout.name} followCursor>
                              <WorkoutImg
                                src={workout.img}
                                alt="workout.id번 운동"
                                onClick={() => onWorkoutHandler(workout.id)}
                                active={workout.id === roomInfo.workoutId}
                              />
                            </Tooltip>
                          );
                        } else {
                          return null;
                        }
                      })}
                    </WorkoutImgBox>
                  </Item>
                </Grid>

                <Grid item xs={5} style={{ padding: '20px' }}>
                  <Item sx={{ width: '100%', height: '400px', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ textAlign: 'center', padding: '20px', paddingBottom: '50px' }}>
                      <p style={{ fontSize: 'larger', fontWeight: 'bold' }}>방 정보</p>
                    </div>
                    <div sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                      <InputBox style={{ padding: '10px' }}>
                        <TextField label="방 제목" value={roomInfo.title} onChange={onTitleHandler} />
                      </InputBox>
                      <InputBox style={{ padding: '10px' }}>
                        <TextField label="방 비밀번호" value={roomInfo.password} onChange={onPasswordHandler} />
                      </InputBox>
                    </div>
                  </Item>
                </Grid>
                <Grid item xs={10} style={{ padding: '20px', display: 'flex' }}>
                  <SubmitBtn style={{ width: '100%' }} onClick={onCreate}>
                    방 생성하기
                  </SubmitBtn>
                </Grid>
              </Grid>
            </SubmitForm>
          </FormBox>
        </Box>
      </Modal>

      {/* 방 생성 버튼 */}
      {isAuthenticated ? (
        <Fab variant="extended" sx={fabStyle} onClick={onOpen}>
          <SportsEsportsIcon style={{ marginRight: '5px' }} />
          <p>방 만들기</p>
        </Fab>
      ) : null}
    </div>
  );
}
