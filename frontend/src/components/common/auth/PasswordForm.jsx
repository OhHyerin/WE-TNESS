import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import FilledInput from '@mui/material/FilledInput';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { fetchPassword, fetchPwdVerify } from '../../../features/user/SignupSlice'
import InputBox from './InputBox';

const Passwordbox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 10px;
`

export default function PasswordBox() {
  const dispatch = useDispatch()

  const password = useSelector(state => state.signup.userInfo.password)
  const pwdVerify = useSelector(state => state.signup.userInfo.pwdVerify)

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
    <Passwordbox>
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
                {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </InputBox>
          
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

    </Passwordbox>
  )
}