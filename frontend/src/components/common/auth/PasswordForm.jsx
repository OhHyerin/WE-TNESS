import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { FilledInput, TextField, IconButton,
  InputLabel, FormControl, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { fetchPassword, fetchPwdVerify } from '../../../features/user/SignupSlice'
import InputBox from './InputBox';

const PasswordBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export default function PasswordForm({...props}) {
  const dispatch = useDispatch()

  const password = useSelector(state => state.signup.userInfo.password)
  const pwdVerify = useSelector(state => state.signup.userInfo.pwdVerify)
  const isSignupError = props?.isSignupError

  const [showPassword, setShowPassword] = useState(false)
  
  const onPasswordHandler = e => {
    dispatch(fetchPassword(e.target.value))
  }
  const onPwdVerifyHandler = e => {
    dispatch(fetchPwdVerify(e.target.value))
  }

  function handleClickShowPassword() {
    setShowPassword(!showPassword)
  }
  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  return (
    <PasswordBox>
      <InputBox>
        <FormControl>
          <InputLabel>*비밀번호</InputLabel>
          <FilledInput
            type={showPassword?"text":"password"}
            value={password}
            onChange={onPasswordHandler}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </InputBox>
      {isSignupError?<p>*영문/숫자/특수문자를 포함하여 8자 이상 입력</p>: null }

      <InputBox>
        <TextField
          error={password !== pwdVerify}
          type="password"
          label="*비밀번호 확인"
          value={pwdVerify}
          onChange={onPwdVerifyHandler}
          helperText={password!==pwdVerify?"비밀번호 확인이 일치하지 않습니다.":null}
        />
      </InputBox>
    </PasswordBox>
  )
}