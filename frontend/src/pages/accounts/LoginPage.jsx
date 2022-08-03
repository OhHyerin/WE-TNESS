import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, Modal, TextField, IconButton, FormControl } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import logo from '../../assets/images/logo.jpg';
import PageBox from '../../components/common/auth/PageBox';
import FormBox from '../../components/common/auth/FormBox';
import InputBox from '../../components/common/auth/InputBox';
import SubmitBtn from '../../components/common/SubmitBtn';
import KakaoLoginBar from '../../components/common/auth/KakaoLoginBar';
import KAKAO_AUTH_URL from '../../api/Oauth';
import { login, findPassword } from '../../features/user/UserSlice';
import IconTextField from '../../components/common/IconTextField';

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 100px;
  padding: 10px;
  gap: 15px;
`;
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

const LinkBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoginError, setIsLoginError] = useState(false);

  const [findPwdEmail, setFindPwdEmail] = useState('');
  const [isModal, setIsModal] = useState(false);
  const handleOpen = () => setIsModal(true);
  const handleClose = () => setIsModal(false);

  function onEmailHandler(e) {
    setEmail(e.target.value);
  }

  function onPasswordHandler(e) {
    setPassword(e.target.value);
  }

  function onFindPwdEmailHandler(e) {
    setFindPwdEmail(e.target.value);
  }

  function onSubmitHandler(e) {
    e.preventDefault();
    const payload = {
      email,
      password,
    };
    dispatch(login(payload))
      .then(res => {
        if (res.type === 'login/fulfilled') {
          navigate('/');
        } else {
          setIsLoginError(true);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  function handleClickShowPassword() {
    setShowPassword(!showPassword);
  }
  function handleMouseDownPassword(e) {
    e.preventDefault();
  }

  function kakaoLoginHandler(e) {
    e.preventDefault();
    window.location.href = KAKAO_AUTH_URL;
  }

  function onSubmitEmail(e) {
    e.preventDefault();
    dispatch(findPassword({ email: findPwdEmail }));
  }

  return (
    <PageBox>
      <FormBox>
        <LoginForm onSubmit={onSubmitHandler}>
          <h1>로그인</h1>
          <InputBox>
            <TextField type="email" label="*이메일" value={email} onChange={onEmailHandler} />
          </InputBox>
          <InputBox>
            <FormControl>
              <IconTextField
                label="*비밀번호"
                error={isLoginError}
                iconEnd={
                  <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                }
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={onPasswordHandler}
                helperText={isLoginError ? '이메일 / 비밀번호를 확인해주세요.' : null}
              />
            </FormControl>
          </InputBox>

          {email && password ? (
            <SubmitBtn>로그인</SubmitBtn>
          ) : (
            <SubmitBtn disabled deactive={true}>
              로그인
            </SubmitBtn>
          )}
        </LoginForm>
        <KakaoLoginBar onClick={kakaoLoginHandler} />
        <LinkBox>
          <p>
            가입하실래요? <Link to="/signup">회원가입</Link>{' '}
          </p>
          <Button onClick={handleOpen}>비밀번호 찾기</Button>
        </LinkBox>
        <Modal open={isModal} onClose={handleClose}>
          <Box sx={style}>
            <p>이메일로 임시 비밀번호를 받아보세용</p>
            <InputBox>
              <TextField type="email" label="*이메일" value={findPwdEmail} onChange={onFindPwdEmailHandler} />
            </InputBox>
            <SubmitBtn onClick={onSubmitEmail}>이메일 보내기</SubmitBtn>
          </Box>
        </Modal>
      </FormBox>
      <FormBox>
        <img src={logo} alt="로고이미지" />
      </FormBox>
    </PageBox>
  );
}
