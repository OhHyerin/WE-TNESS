import { useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Box, Modal, TextField, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Banner from '../../components/home/Banner';
import RankingPreview from '../../components/home/RankingPreview';
import RoomList from '../../components/home/RoomList';
import RoomFilter1 from '../../components/home/RoomFilter1';
import RoomFilter2 from '../../components/home/RoomFilter2';
import FormBox from '../../components/common/auth/FormBox';
import InputBox from '../../components/common/auth/InputBox';
import SubmitBtn from '../../components/common/SubmitBtn';
import { checkNickname, addInfo, toggleIsModal } from '../../features/user/SignupSlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const SubmitForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 10px;
`;

const fabStyle = {
  position: 'fixed',
  bottom: 16,
  right: 16,
  color: 'white',
  backgroundColor: '#009688',
  '&:hover': {
    bgcolor: '#18b4a4',
    color: '#d5d8d8',
  },
};

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = useSelector(state => state.user.currentUser);
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);

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
  }
  function onWorkoutHandler(e) {
    e.preventDefault();
  }
  function onPasswordHandler(e) {
    e.preventDefault();
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
        </>
        <>
          {/* 비밀방 여부 */}
          <RoomFilter2 />
        </>
        <RoomList />
        <button
          onClick={() => {
            navigate('room/3');
          }}>
          방 입장
        </button>
      </div>

      {/* 카카오 로그인 추가정보 입력 모달 */}
      <Modal open={isModal} onClose={handleClose}>
        <Box sx={style}>
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
              <SubmitBtn disabled={!isPossibleNickname} deactive={!isPossibleNickname}>
                제출
              </SubmitBtn>
            </SubmitForm>
          </FormBox>
          <button onClick={handleClose}>닫기</button>
        </Box>
      </Modal>

      <Modal open={isAddRoom} onClose={onClose}>
        <Box sx={style}>
          <FormBox>
            <SubmitForm onSubmit={onSubmitRoom}>
              <h1>추가 정보 입력</h1>
              <p>운동종류</p>
              <InputBox>
                <TextField label="방 제목" value={roomInfo.title} onChange={onTitleHandler} />
              </InputBox>
              <InputBox>
                <TextField label="방 비밀번호" value={roomInfo.password} onChange={onTitleHandler} />
              </InputBox>
              <SubmitBtn disabled={false} deactive={false}>
                제출
              </SubmitBtn>
            </SubmitForm>
          </FormBox>
          <button onClick={onClose}>닫기</button>
        </Box>
      </Modal>

      {/* 방 생성 버튼 */}
      <Fab sx={fabStyle} onClick={onOpen}>
        <AddIcon />
      </Fab>
    </div>
  );
}
