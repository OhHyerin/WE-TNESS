import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { signup, checkNickname } from '../../features/user/userSlice'
import FormBox from "../../components/common/FormBox";
import InputBox from '../../components/common/InputBox';
import SubmitBtn from '../../components/common/SubmitBtn';

const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 10px;
`

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const isPossibleNickname = useSelector(state => state.user.isPossibleNickName);

  const [nickname, setNickname] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isCheck, setIsCheck] = useState(false)

  const onNicknameHandler = e => {
    setNickname(e.currentTarget.value)
  }
  const onEmailHandler = e => {
    setEmail(e.currentTarget.value)
  }
  const onPasswordHandler = e => {
    setPassword(e.currentTarget.value)
  }
  const onConfirmPasswordHandler = e => {
    setConfirmPassword(e.currentTarget.value)
  }

  function onSubmitHandler (e) {
    e.prventDefault()

    const payload = {
      email,
      password,
      confirmPassword,
      nickname,
    }
    dispatch(signup(payload))
      .then(() => {
        navigate('/')
      })
  }

  function onCheckNicknameHandler (e) {
    e.preventDefault()
    const payload = {
      nickname
    }
    setIsCheck(true)
    dispatch(checkNickname(payload))
  }

  return (
    <div>
      <FormBox>
        <h1>회원가입 페이지입니당</h1>
        <SignupForm
          onSubmit={onSubmitHandler}
        >
          <InputBox>
            <label>닉네임</label>
            <input
              type="text"
              placeholder="닉네임"
              value={nickname}
              onChange={onNicknameHandler}
            />
          </InputBox>
          <SubmitBtn
            onClick={onCheckNicknameHandler}
          >
            닉네임 확인하기
          </SubmitBtn>
          { isCheck ? ( 
            isPossibleNickname ? (
              <span>사용가능한 닉네임입니다.</span>
            ) : (
              <span>사용중인 닉네임입니다.</span>
            )) : null
          }
          <InputBox> 
            <label>이메일</label>
            <input
              type="email"
              placeholder="test@example.com"
              value={email}
              onChange={onEmailHandler}
            />
          </InputBox>
          <InputBox>
            <label>비밀번호</label>
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={onPasswordHandler}
            />
          </InputBox>
          <InputBox>
            <label>비밀번호 확인</label>
            <input
              type="password"
              placeholder="비밀번호 확인"
              value={confirmPassword}
              onChange={onConfirmPasswordHandler}
            />
          </InputBox>
          <SubmitBtn>
            회원가입
          </SubmitBtn>
        </SignupForm>
        <p>회원이신가요? <Link to="/login">로그인</Link> </p>
      </FormBox>
    </div>
  );
}