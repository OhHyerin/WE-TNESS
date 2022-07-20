import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
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
  const [inputId, setInputId] = useState('')
  const [inputPw, setInputPw] = useState('')

  const dispatch = useDispatch();

  const handleInputId = e => {
    setInputId(e.target.value)
  };

  const handleInputPw = e => {
    setInputPw(e.target.value)
  };

  return (
    <div>
      <FormBox>
        <h1>로그인페이지임당</h1>
        <LoginForm>
          <label>아이디</label>
          <input
            type='text'
            value={inputId}
            onChange={handleInputId}
          />
          <label>비밀번호</label>
          <input
            type='password'
            value={inputPw}
            onChange={handleInputPw}
          />
          <SubmitBtn
            onClick={() => {
              dispatch(login())
            }}>
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
