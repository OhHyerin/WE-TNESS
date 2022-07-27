import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import { signup, checkNickname, checkEmail, fetchNickname, fetchEmail } from '../../features/user/SignupSlice';
import FormBox from '../../components/common/auth/FormBox';
import InputBox from '../../components/common/auth/InputBox';
import SubmitBtn from '../../components/common/SubmitBtn';
import PasswordForm from '../../components/common/auth/PasswordForm';
import AddressForm from '../../components/common/auth/AddressForm';
import GenderForm from '../../components/common/auth/GenderForm';
import BodyForm from '../../components/common/auth/BodyForm';

const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 10px;
`;

export default function SignupPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userInfo = useSelector(state => state.signup.userInfo);
  const isPossibleNickname = useSelector(state => state.signup.isPossibleNickname);
  const isPossibleEmail = useSelector(state => state.signup.isPossibleEmail);

  const [isCheckNN, setIsCheckNN] = useState(false);
  const [isCheckEmail, setIsCheckEmail] = useState(false);

  const onNicknameHandler = e => {
    dispatch(fetchNickname(e.target.value));
  };
  const onEmailHandler = e => {
    dispatch(fetchEmail(e.target.value));
  };

  function onCheckNicknameHandler(e) {
    e.preventDefault();
    const payload = userInfo.nickname;
    setIsCheckNN(true);
    dispatch(checkNickname(payload));
  }

  function onCheckEmailHandler(e) {
    e.preventDefault();
    const payload = userInfo.email;
    setIsCheckEmail(true);
    dispatch(checkEmail(payload));
  }

  function onSubmitHandler(e) {
    e.preventDefault();
    const payload = userInfo;
    console.log(payload);
    dispatch(signup(payload))
      .then(() => {
        navigate('/');
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <div>
      <FormBox>
        <h1>회원가입 페이지입니당</h1>
        <SignupForm onSubmit={onSubmitHandler}>
          <InputBox>
            <TextField
              error={isCheckNN && !isPossibleNickname}
              label="*닉네임"
              value={userInfo.nickname}
              onChange={onNicknameHandler}
              helperText={
                isCheckNN ? (isPossibleNickname ? '사용 가능한 닉네임입니다.' : '사용중인 닉네임입니다.') : null
              }
            />
          </InputBox>
          {userInfo.nickname ? (
            <SubmitBtn onClick={onCheckNicknameHandler}>닉네임 확인</SubmitBtn>
          ) : (
            <SubmitBtn disabled deactive={!userInfo.nickname}>
              닉네임확인
            </SubmitBtn>
          )}
          <InputBox>
            <TextField
              error={isCheckEmail && !isPossibleEmail}
              type="email"
              label="*이메일"
              value={userInfo.email}
              onChange={onEmailHandler}
              helperText={
                isCheckEmail ? (isPossibleEmail ? '사용 가능한 이메일입니다.' : '사용중인 이메일입니다.') : null
              }
            />
          </InputBox>
          {userInfo.email ? (
            <SubmitBtn onClick={onCheckEmailHandler}>이메일 확인</SubmitBtn>
          ) : (
            <SubmitBtn disabled deactive={!userInfo.email}>
              이메일 확인
            </SubmitBtn>
          )}

          <PasswordForm></PasswordForm>

          <InputBox>
            <GenderForm></GenderForm>
          </InputBox>
          <InputBox>
            <label>주소</label>
            <AddressForm />
          </InputBox>
          <BodyForm></BodyForm>
          <SubmitBtn
            disabled={!isPossibleNickname || !isPossibleEmail || userInfo.password !== userInfo.pwdVerify}
            deactive={!isPossibleNickname || !isPossibleEmail || userInfo.password !== userInfo.pwdVerify}>
            회원가입
          </SubmitBtn>
        </SignupForm>
        <p>
          회원이신가요? <Link to="/login">로그인</Link>{' '}
        </p>
      </FormBox>
    </div>
  );
}
