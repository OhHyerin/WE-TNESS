import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../features/user/userSlice';
import KAKAO_AUTH_URL from '../../api/Oauth';
import FormBox from '../../components/common/FormBox'
import InputBox from '../../components/common/InputBox';
import SubmitBtn from '../../components/common/SubmitBtn';
import KakaoLoginBar from '../../components/common/login/KakaoLoginBar';

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 10px;
`

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch();

  const handleEmail = e => {
    setEmail(e.target.value)
  };

  const handlePassword = e => {
    setPassword(e.target.value)
  };

  function handleSubmit (e) {
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

  return (
    <div>
      <FormBox>
        <h1>로그인페이지임당</h1>
        <LoginForm
          onSubmit={handleSubmit}
        >
          <InputBox>
            <label>이메일</label>
            <input
              type='text'
              value={email}
              onChange={handleEmail}
            />
          </InputBox>
          <InputBox>
            <label>비밀번호</label>
            <input
              type='password'
              value={password}
              onChange={handlePassword}
            />
          </InputBox>
          <SubmitBtn>
            로그인
          </SubmitBtn>  
        </LoginForm>

        <hr/>
        <a href={KAKAO_AUTH_URL}>
          <KakaoLoginBar/>
        </a>
        <p>가입하실래요? <Link to="/signup">로그인</Link> </p>
      </FormBox>
    </div>
  );
}
