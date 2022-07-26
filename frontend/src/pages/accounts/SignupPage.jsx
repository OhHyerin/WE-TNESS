import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import FilledInput from '@mui/material/FilledInput';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { signup, checkNickname, fetchNickname, fetchEmail,
  fetchPassword, fetchPwdVerify} from '../../features/user/SignupSlice'
import FormBox from "../../components/common/auth/FormBox";
import InputBox from '../../components/common/auth/InputBox';
import SubmitBtn from '../../components/common/SubmitBtn';
import AddressForm from '../../components/common/auth/AddressForm';
import GenderForm from '../../components/common/auth/GenderForm';
import BodyForm from '../../components/common/auth/BodyForm';

const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 10px;
`

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userInfo = useSelector(state => state.signup.userInfo)

  const isPossibleNickname = useSelector(state => state.user.isPossibleNickname);

  const [isCheckNN, setIsCheckNN] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const onNicknameHandler = e => {
    dispatch(fetchNickname(e.target.value))
  }
  const onEmailHandler = e => {
    dispatch(fetchEmail(e.target.value))
  }
  const onPasswordHandler = e => {
    dispatch(fetchPassword(e.target.value))
  }
  const onPwdVerifyHandler = e => {
    dispatch(fetchPwdVerify(e.target.value))
  }
  
  
  function onCheckNicknameHandler (e) {
    e.preventDefault()
    const payload = userInfo.nickname
    setIsCheckNN(true)
    dispatch(checkNickname(payload))
  }

  function onSubmitHandler (e) {
    e.preventDefault()
    const payload = userInfo
    console.log(payload)
    dispatch(signup(payload))
      .then(() => {
        navigate('/')
      })
      .catch(err => {
        console.log(err)
      })
  }

  function handleClickShowPassword() {
    setShowPassword(!showPassword)
  }
  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  return (
    <div>
      <FormBox>
        <h1>회원가입 페이지입니당</h1>
        <SignupForm
          onSubmit={onSubmitHandler}
        >
          <InputBox>
            <TextField
              error={isCheckNN && !isPossibleNickname}
              label="*닉네임"
              value={userInfo.nickname}
              onChange={onNicknameHandler}
              helperText={isCheckNN ? (isPossibleNickname ? "사용 가능한 닉네임입니다." : "사용중인 닉네임입니다.") : null}
            />
          </InputBox>
          { userInfo.nickname ? (
            <SubmitBtn onClick={onCheckNicknameHandler}>
              닉네임 확인
            </SubmitBtn>
          ) : (
            <SubmitBtn disabled deactive={!userInfo.nickname}>
              닉네임확인
            </SubmitBtn>
          )}
          <InputBox>
            <TextField
              type="email"
              label="*이메일"
              value={userInfo.email}
              onChange={onEmailHandler}
            />
          </InputBox>
          <InputBox>
            <FormControl>
              <InputLabel>*비밀번호</InputLabel>
              <FilledInput
                type={showPassword?"text":"password"}
                value={userInfo.password}
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
          
          <InputBox>
            <TextField
              error={userInfo.password !== userInfo.pwdVerify}
              type="password"
              label="*비밀번호 확인"
              value={userInfo.pwdVerify}
              onChange={onPwdVerifyHandler}
              helperText={userInfo.password!==userInfo.pwdVerify?"비밀번호 확인이 일치하지 않습니다.":null}
            />
          </InputBox>
          <InputBox>
            <GenderForm></GenderForm>
          </InputBox>
          <InputBox>
            <label>주소</label>
            <AddressForm/>
          </InputBox>
          <BodyForm></BodyForm>
          <SubmitBtn
            disabled={!isPossibleNickname}
            deactive={!isPossibleNickname}
          >
            회원가입
          </SubmitBtn>
        </SignupForm>
        <p>회원이신가요? <Link to="/login">로그인</Link> </p>
      </FormBox>
    </div>
  );
}
