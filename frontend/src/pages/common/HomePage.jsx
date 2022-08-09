import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Box, Modal, TextField, Fab } from '@mui/material';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import ClearIcon from '@mui/icons-material/Clear';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Banner from '../../components/home/Banner';
import RankingPreview from '../../components/home/RankingPreview';
import RoomList from '../../components/home/RoomList';
import RoomFilter1 from '../../components/home/RoomFilter1';
import RoomFilter2 from '../../components/home/RoomFilter2';
import FormBox from '../../components/common/auth/FormBox';
import InputBox from '../../components/common/auth/InputBox';
import SubmitBtn from '../../components/common/SubmitBtn';
import { checkNickname, addInfo, toggleIsModal } from '../../features/user/SignupSlice';
import { fetchTitle, fetchPassword, createRoom, fetchWorkoutId } from '../../features/room/RoomSlice';

const style = {
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
  gap: 10px;
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
  top: '10px',
  right: '10px',
  '&:hover': {
    cursor: 'pointer',
    opacity: '80%',
  },
};

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = useSelector(state => state.user.currentUser);
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);

  // 방 입장 관련
  const sessionId = useSelector(state => state.room.sessionInfo.sessionId);

  function onCreate(e) {
    e.preventDefault();
    const payload = {
      workoutId: roomInfo.workoutId,
      title: roomInfo.title,
      password: roomInfo.password,
    };
    dispatch(createRoom(payload)).then(navigate('/room'));
  }

  // 방 생성 관련
  const [isAddRoom, setIsAddRoom] = useState(false);
  const roomInfo = useSelector(state => state.room.roomInfo);
  function onOpen(e) {
    setIsAddRoom(true);
  }
  function onClose(e) {
    setIsAddRoom(false);
  }
  function onTitleHandler(e) {
    e.preventDefault();
    dispatch(fetchTitle(e.target.value));
  }
  function onWorkoutHandler(e) {
    e.preventDefault();
    dispatch(fetchWorkoutId(e.target.value));
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
    console.log(payload);
    dispatch(addInfo(payload))
      .then(() => {})
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <div>
      <div>
        <Banner />
        <RankingPreview />
        <>
          {/* 운동 목록 */}
          <RoomFilter1 />
          {/* 비밀방 여부 */}
          <RoomFilter2 />
        </>
        <RoomList />

        {/* 방 입장 테스트 버튼 */}
        <button
          onClick={() => {
            const payload = {
              workoutId: 1,
              title: '스쿼트 짱',
              password: '',
            };
            dispatch(createRoom(payload)).then(navigate(sessionId));
          }}>
          방 입장
        </button>
      </div>

      {/* 카카오 로그인 추가정보 입력 모달 */}
      <Modal open={isModal} onClose={handleClose}>
        <Box sx={style}>
          <ClearIcon sx={closeStyle} onClick={handleClose}></ClearIcon>
          <FormBox>
            <SubmitForm onSubmit={onSubmitHandler}>
              <h1>추가 정보 입력</h1>
              <InputBox>
                <TextField
                  error={isCheckNN && !isPossibleNickname}
                  label="*닉네임"
                  value={nickname}
                  onChange={onNicknameHandler}
                  helperText={
                    isCheckNN ? (isPossibleNickname ? '사용 가능한 닉네임입니다.' : '사용중인 닉네임입니다.') : null
                  }
                />
              </InputBox>
              {nickname ? (
                <SubmitBtn onClick={onCheckNicknameHandler}>닉네임 확인</SubmitBtn>
              ) : (
                <SubmitBtn disabled deactive={!nickname}>
                  닉네임확인
                </SubmitBtn>
              )}
              <SubmitBtn disabled={!isCheckNN || !isPossibleNickname} deactive={!isCheckNN || !isPossibleNickname}>
                제출
              </SubmitBtn>
            </SubmitForm>
          </FormBox>
        </Box>
      </Modal>

      {/* 방 생성 모달 */}
      <Modal open={isAddRoom} onClose={onClose}>
        <Box sx={addStyle}>
          <ClearIcon sx={closeStyle} onClick={onClose}></ClearIcon>
          <FormBox>
            <SubmitForm onSubmit={onSubmitRoom}>
              <FormControl
                value={roomInfo.workoutId}
                onChange={onWorkoutHandler}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'end',
                }}>
                <FormLabel>운동종류</FormLabel>
                <RadioGroup defaultValue="1">
                  <FormControlLabel value="1" control={<Radio />} label="1번 운동" />
                  <FormControlLabel value="2" control={<Radio />} label="2번 운동" />
                  <FormControlLabel value="3" control={<Radio />} label="3번 운동" />
                </RadioGroup>
              </FormControl>
              <InputBox>
                <TextField label="방 제목" value={roomInfo.title} onChange={onTitleHandler} />
              </InputBox>
              <InputBox>
                <TextField label="방 비밀번호" value={roomInfo.password} onChange={onPasswordHandler} />
              </InputBox>
              <SubmitBtn disabled={false} deactive={false} onClick={onCreate}>
                방 생성하기
              </SubmitBtn>
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
