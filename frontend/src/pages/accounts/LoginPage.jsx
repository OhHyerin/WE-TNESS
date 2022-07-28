import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { OutlinedInput } from '@mui/material';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { login, findPassword } from '../../features/user/UserSlice';
import FormBox from '../../components/common/auth/FormBox'
import InputBox from '../../components/common/auth/InputBox';
import SubmitBtn from '../../components/common/SubmitBtn';
import KakaoLoginBar from '../../components/common/auth/KakaoLoginBar';
import KAKAO_AUTH_URL from '../../api/Oauth';

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 15px;
`
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
`

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoginError, setIsLoginError] = useState(false)

  const [findPwdEmail, setFindPwdEmail] = useState('')
  const [isModal, setIsModal] = useState(false)
  const handleOpen = () => setIsModal(true);
  const handleClose = () => setIsModal(false);

  function onEmailHandler (e) {
    setEmail(e.target.value)
  };

  function onPasswordHandler (e) {
    setPassword(e.target.value)
  };

  function onFindPwdEmailHandler (e) {
    setFindPwdEmail(e.target.value)
  }

  function onSubmitHandler (e) {
    e.preventDefault()
    const payload = {
      email,
      password
    }
    dispatch(login(payload))
      .then(res => {
        if (res.type === 'login/fulfilled') {
          navigate('/')
        } else {
          setIsLoginError(true)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  function handleClickShowPassword () {
    setShowPassword(!showPassword)
  }
  function handleMouseDownPassword (e) {
    e.preventDefault();
  };

  function kakaoLoginHandler (e) {
    e.preventDefault();
    window.location.href = KAKAO_AUTH_URL
  }

  function onSubmitEmail (e) {
    e.preventDefault();
    dispatch(findPassword({email: findPwdEmail}))
  }

  return (
    <FormBox>
      <h1>로그인페이지임당</h1>
      <LoginForm
        onSubmit={onSubmitHandler}
      >
        <InputBox>
          <TextField
            type="email"
            label="*이메일"
            value={email}
            onChange={onEmailHandler}
          />
        </InputBox>
        <InputBox>
          <FormControl>
            <InputLabel>*비밀번호</InputLabel>
            <OutlinedInput
              label="*비밀번호"
              type={showPassword?"text":"password"}
              value={password}
              onChange={onPasswordHandler}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </InputBox>
        {isLoginError?<p>이메일 / 비밀번호를 확인해주세요.</p>: null }
        { email&&password ? (
            <SubmitBtn>로그인</SubmitBtn>
          ) : (
            <SubmitBtn disabled deactive={true}>
              로그인
            </SubmitBtn>
          )}
      </LoginForm>
        <KakaoLoginBar
          onClick={kakaoLoginHandler}
        />
      <LinkBox>
        <p>가입하실래요? <Link to="/signup">회원가입</Link> </p>
        <Button onClick={handleOpen}>비밀번호 찾기</Button>
      </LinkBox>
      <Modal
        open={isModal}
        onClose={handleClose}
      >
        <Box sx={style}>
          <p>이메일로 임시 비밀번호를 받아보세용</p>
          <InputBox>
            <TextField
              type="email"
              label="*이메일"
              value={findPwdEmail}
              onChange={onFindPwdEmailHandler}
            />
          </InputBox>
          <SubmitBtn
            onClick={onSubmitEmail}
          >
            이메일 보내기
          </SubmitBtn>
        </Box>
      </Modal>
    </FormBox>
  );
}
