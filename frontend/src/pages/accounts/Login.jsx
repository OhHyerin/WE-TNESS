import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { login } from '../../features/user/userSlice';
import KAKAO_AUTH_URL from '../../api/Oauth';
import FormBox from '../../components/common/FormBox'
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

  const [inputEmail, setInputEmail] = useState('')
  const [inputPassword, setInputPassword] = useState('')

  const dispatch = useDispatch();

  const handleInputEmail = e => {
    setInputEmail(e.target.value)
  };

  const handleInputPassword = e => {
    setInputPassword(e.target.value)
  };

  function handleSubmit (e) {
    e.preventDefault()
    const payload = {
      inputEmail,
      inputPassword
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
          <label>이메일</label>
          <input
            type='text'
            value={inputEmail}
            onChange={handleInputEmail}
          />
          <label>비밀번호</label>
          <input
            type='password'
            value={inputPassword}
            onChange={handleInputPassword}
          />
          <SubmitBtn>
            로그인 해봐요
          </SubmitBtn>  
        </LoginForm>

        <a href={KAKAO_AUTH_URL}>
          <KakaoLoginBar/>
        </a>
      </FormBox>
    </div>
  );
}
