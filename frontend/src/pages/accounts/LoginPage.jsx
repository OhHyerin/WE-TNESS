import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import FilledInput from '@mui/material/FilledInput';
import { OutlinedInput } from '@mui/material';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { login, testLogin, } from '../../features/user/UserSlice';
import FormBox from '../../components/common/auth/FormBox'
import InputBox from '../../components/common/auth/InputBox';
import SubmitBtn from '../../components/common/SubmitBtn';
import KakaoLoginBar from '../../components/common/auth/KakaoLoginBar';
import KAKAO_AUTH_URL from '../../api/Oauth';

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 10px;
`

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  function onEmailHandler (e) {
    setEmail(e.target.value)
  };

  function onPasswordHandler (e) {
    setPassword(e.target.value)
  };

  function onSubmitHandler (e) {
    e.preventDefault()
    const payload = {
      email,
      password
    }
    dispatch(login(payload))
      .then(() => {
        navigate('/')
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

  return (
    <div>
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
          <SubmitBtn>
            로그인
          </SubmitBtn>
        </LoginForm>

        <hr/>
        <KakaoLoginBar
          onClick={kakaoLoginHandler}
        />

        <SubmitBtn onClick={() => {dispatch(testLogin())}}>Test Login</SubmitBtn>
        <p>가입하실래요? <Link to="/signup">로그인</Link> </p>
      </FormBox>
    </div>
  );
}
