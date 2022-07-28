import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Banner from '../../components/home/Banner';
import RankingPreview from '../../components/home/RankingPreview';
import RoomList from '../../components/home/RoomList';
import RoomFilter1 from '../../components/home/RoomFilter1';
import RoomFilter2 from '../../components/home/RoomFilter2';
import { toggleIsModal, checkLogin } from '../../features/user/UserSlice';
import FormBox from '../../components/common/auth/FormBox';
import InputBox from '../../components/common/auth/InputBox';
import SubmitBtn from '../../components/common/SubmitBtn';
import { checkNickname } from '../../features/user/SignupSlice';
import { getAccessToken } from '../../features/Token';

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

export default function Home() {
  useEffect(() => {
    const Token = getAccessToken();
    if (Token) {
      dispatch(checkLogin());
    }
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isModal = useSelector(state => state.user.isModal);
  const isPossibleNickname = useSelector(state => state.user.isPossibleNickname);
  const [nickname, setNickname] = useState('');
  const [isCheckNN, setIsCheckNN] = useState(false);

  // 모달 닫기 테스트버튼
  const [testModal, setTestModal] = useState(true);
  function handleClose() {
    setTestModal(false);
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
    // dispatch(addInfo(payload))
    //   .then(() => {
    //     handleClose()
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
  }

  return (
    <div>
      <div>
        <Modal
          // open={isModal}
          open={testModal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
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
    </div>
  );
}
