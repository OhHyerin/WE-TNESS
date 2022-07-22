import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Radio from "@mui/material/Radio";
import { RadioGroup } from '@mui/material';
import FormControlLabel from "@mui/material/FormControlLabel";
import OutlinedInput from '@mui/material/FilledInput';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
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
  const addressCode = useSelector(state => state.user.addressCode)
  
  const [nickname, setNickname] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [pwdVerify, setPwdVerify] = useState("")
  const [gender, setGender] = useState("")
  const [isCheckNN, setIsCheckNN] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const onNicknameHandler = e => {
    setNickname(e.currentTarget.value)
  }
  const onEmailHandler = e => {
    setEmail(e.currentTarget.value)
  }
  const onPasswordHandler = e => {
    setPassword(e.currentTarget.value)
  }
  const onPwdVerifyHandler = e => {
    setPwdVerify(e.currentTarget.value)
  }
  function onGenderHandeler (e) {
    setGender(e.target.value)
  }
  
  function onCheckNicknameHandler (e) {
    e.preventDefault()
    const payload = {
      nickname
    }
    setIsCheckNN(true)
    dispatch(checkNickname(payload))
  }

  function onSubmitHandler (e) {
    e.preventDefault()
    const payload = {
      email,
      password,
      pwdVerify,
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

  function handleClickShowPassword() {
    setShowPassword(!showPassword)
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
              error={isCheckNN && !isPossibleNickname}
              label="*닉네임"
              value={nickname}
              onChange={onNicknameHandler}
              helperText={isCheckNN ? (isPossibleNickname ? "사용 가능한 닉네임입니다." : "사용중인 닉네임입니다.") : null}
            />
          </InputBox>
          { nickname ? (
            <SubmitBtn onClick={onCheckNicknameHandler}>
              닉네임 확인하기
            </SubmitBtn>
          ) : (
            <SubmitBtn disabled deactive={!nickname}>
              닉네임확인하기
            </SubmitBtn>
          )}
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
              <InputLabel htmlFor="outlined-adornment-password">*비밀번호</InputLabel>
              <OutlinedInput
                type={showPassword?"text":"password"}
                value={password}
                onChange={onPasswordHandler}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
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
          <SubmitBtn disabled={!isPossibleNickname} deactive={!isPossibleNickname}>
            회원가입
          </SubmitBtn>
        </SignupForm>
        <p>회원이신가요? <Link to="/login">로그인</Link> </p>
      </FormBox>
    </div>
  );
}
