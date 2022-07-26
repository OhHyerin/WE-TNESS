import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import { checkNickname, fetchNickname, fetchEmail, fetchUserInfo} from '../../features/user/SignupSlice'
import { edit } from '../../features/user/UserSlice'
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

export default function EditPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserInfo())
  }, [])

  const userInfo = useSelector(state => state.signup.userInfo)

  const isPossibleNickname = useSelector(state => state.user.isPossibleNickname);

  const [isCheckNN, setIsCheckNN] = useState(false)

  const onNicknameHandler = e => {
    dispatch(fetchNickname(e.target.value))
  }
  const onEmailHandler = e => {
    dispatch(fetchEmail(e.target.value))
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
    dispatch(edit(payload))
      .then(() => {
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div>
      <FormBox>
        <h1>회원정보 수정</h1>
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
              닉네임 확인하기
            </SubmitBtn>
          ) : (
            <SubmitBtn disabled deactive={!userInfo.nickname}>
              닉네임확인하기
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
            수정하기
          </SubmitBtn>
        </SignupForm>
      </FormBox>
    </div>
  );
}
