import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Radio from "@mui/material/Radio";
import { RadioGroup } from '@mui/material';
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from '@mui/material/TextField';
import { signup, checkNickname } from '../../features/user/userSlice'
import FormBox from "../../components/common/auth/FormBox";
import InputBox from '../../components/common/auth/InputBox';
import SubmitBtn from '../../components/common/SubmitBtn';
import AddressForm from '../../components/common/auth/AddressForm';

const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 10px;
`

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isPossibleNickname = useSelector(state => state.user.isPossibleNickname);
  
  const [nickname, setNickname] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [gender, setGender] = useState("female")
  const [isCheck, setIsCheck] = useState(false)

  const addressCode = useSelector(state => state.user.addressCode)

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
  function onGenderHandeler (e) {
    setGender(e.target.value)
  }
  
  function onCheckNicknameHandler (e) {
    e.preventDefault()
    const payload = {
      nickname
    }
    setIsCheck(true)
    dispatch(checkNickname(payload))
  }
  
  function onSubmitHandler (e) {
    e.preventDefault()
    const payload = {
      email,
      password,
      confirmPassword,
      nickname,
      gender,
      addressCode,
    }
    console.log(payload)
    dispatch(signup(payload))
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
        <h1>회원가입 페이지입니당</h1>
        <SignupForm
          onSubmit={onSubmitHandler}
        >
          <InputBox>
            <TextField
              label="*닉네임"
              value={nickname}
              onChange={onNicknameHandler}
            />
          </InputBox>
          { nickname ? (
            <SubmitBtn onClick={onCheckNicknameHandler}>
              닉네임 확인하기
            </SubmitBtn>
          ) : (
            <SubmitBtn deactive={!nickname}>
              닉네임확인하기
            </SubmitBtn>
          )}
          { isCheck ? (
            isPossibleNickname ? (
              <span>사용가능한 닉네임입니다.</span>
            ) : (
              <span>사용중인 닉네임입니다.</span>
            )) : null
          }
          <InputBox>
            <TextField
              type="email"
              label="*이메일"
              value={email}
              onChange={onEmailHandler}
            />
          </InputBox>
          <InputBox>
            <TextField
              type="password"
              label="*비밀번호"
              value={password}
              onChange={onPasswordHandler}
            />
          </InputBox>
          <InputBox>
            <TextField
              type="password"
              label="*비밀번호 확인"
              value={confirmPassword}
              onChange={onConfirmPasswordHandler}
            />
          </InputBox>
          <InputBox>
            <label >성별</label>
            <RadioGroup
              value={gender}
              onChange={onGenderHandeler}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "end",
              }}
            >
              <FormControlLabel value="female" control={<Radio />} label="여성" />
              <FormControlLabel value="male" control={<Radio />} label="남성" />
            </RadioGroup>
          </InputBox>
          <InputBox>
            <label>주소</label>
            <AddressForm/>
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
