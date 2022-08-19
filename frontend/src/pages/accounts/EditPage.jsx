import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Box, Button, Modal } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { checkEditNickname } from '../../features/user/SignupSlice';
import { signout } from '../../features/user/UserSlice';
import { fetchUserInfo, edit, changePassword, fetchNickname } from '../../features/user/EditSlice';
import SubmitBtn from '../../components/common/SubmitBtn';
import IconTextField from '../../components/common/IconTextField';
import FormBox from '../../components/common/auth/FormBox';
import InputBox from '../../components/common/auth/InputBox';
import PasswordForm from '../../components/common/auth/PasswordForm';
import AddressForm from '../../components/common/auth/AddressForm';
import GenderForm from '../../components/common/auth/GenderForm';
import BodyForm from '../../components/common/auth/BodyForm';
import CheckBtn from '../../components/common/CheckBtn';
import { fetchCurrentUser } from '../../features/user/UserSlice';
import { getCurrentUser } from '../../features/Token';

const MySwal = withReactContent(Swal);

const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 10px;
`;

const LabelBox = styled.div`
  display: flex;
  justify-content: end;
`;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function EditPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  const userInfo = useSelector(state => state.edit.userInfo);
  const addressCode = useSelector(state => state.edit.addressCode);
  const password = useSelector(state => state.signup.userInfo.password);
  const pwdVerify = useSelector(state => state.signup.userInfo.pwdVerify);
  const isPossibleNickname = useSelector(state => state.signup.isPossibleNickname);

  const [isCheckingNN, setIsCheckingNN] = useState(false);
  const [isCheckNN, setIsCheckNN] = useState(false);
  const [isPasswordEdit, setIsPasswordEdit] = useState(false);

  const [isEditError, setIsEditError] = useState(false);

  const handleOpen = () => setIsPasswordEdit(true);
  const handleClose = () => setIsPasswordEdit(false);

  const onNicknameHandler = e => {
    setIsCheckingNN(true);
    dispatch(fetchNickname(e.target.value));
  };

  function onCheckNicknameHandler(e) {
    e.preventDefault();
    const payload = userInfo.nickname;
    setIsCheckingNN(false);
    setIsCheckNN(true);
    dispatch(checkEditNickname(payload));
  }

  function onSubmitHandler(e) {
    e.preventDefault();
    const payload = {
      nickname: userInfo.nickname,
      gender: userInfo.gender,
      weight: userInfo.weight,
      height: userInfo.height,
      addressCode,
    };
    dispatch(edit(payload))
      .then(() => {
        dispatch(fetchCurrentUser(getCurrentUser()));
        MySwal.fire({
          title: <p>회원정보 변경</p>,
          titleText: <p>변경되었습니다.</p>,
          icon: 'success',
        });
        navigate('/');
      })
      .catch(err => {});
  }

  function onChangePassword(e) {
    e.preventDefault();
    const payload = {
      password,
    };
    dispatch(changePassword(payload))
      .then(res => {
        if (res.type === 'changePassword/fulfilled') {
          MySwal.fire({
            title: <p>비밀번호 변경</p>,
            titleText: <p>변경되었습니다.</p>,
            icon: 'success',
          });
          dispatch(handleClose());
        } else {
          setIsEditError(true);
        }
      })
      .catch(err => {});
  }

  // 회원 탈퇴
  function onSignoutHandler(e) {
    dispatch(signout()).then(navigate('/'));
  }

  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  if (isAuthenticated) {
    return (
      <div>
        <Modal open={isPasswordEdit} onClose={handleClose}>
          <Box sx={style}>
            <h1>비밀번호 변경</h1>
            <form onSubmit={onChangePassword}>
              <PasswordForm isError={isEditError}></PasswordForm>
              <SubmitBtn
                disabled={password !== pwdVerify || password === ''}
                deactive={password !== pwdVerify || password === ''}>
                변경하기
              </SubmitBtn>
            </form>
          </Box>
        </Modal>

        <FormBox>
          <h1>회원정보 수정</h1>
          <SignupForm onSubmit={onSubmitHandler}>
            <InputBox>
              <IconTextField
                error={isCheckNN && !isPossibleNickname}
                iconStart={<AccountCircle />}
                iconEnd={
                  userInfo.nickname ? (
                    <CheckBtn onClick={onCheckNicknameHandler}>확인</CheckBtn>
                  ) : (
                    <CheckBtn disabled deactive={!userInfo.nickname}>
                      확인
                    </CheckBtn>
                  )
                }
                label="*닉네임"
                value={userInfo.nickname}
                onChange={onNicknameHandler}
                helperText={
                  isCheckNN ? (isPossibleNickname ? '사용 가능한 닉네임입니다.' : '사용중인 닉네임입니다.') : null
                }
              />
            </InputBox>
            <InputBox>
              <GenderForm></GenderForm>
            </InputBox>
            <InputBox>
              <label>주소</label>
              <AddressForm />
            </InputBox>
            <BodyForm></BodyForm>
            <SubmitBtn
              disabled={isCheckingNN || (isCheckNN && !isPossibleNickname)}
              deactive={isCheckingNN || (isCheckNN && !isPossibleNickname)}>
              수정하기
            </SubmitBtn>
          </SignupForm>
          <LabelBox>
            <Button onClick={handleOpen}>비밀번호 변경</Button>
            <Button onClick={onSignoutHandler}>회원 탈퇴</Button>
          </LabelBox>
        </FormBox>
      </div>
    );
  }
  return <Navigate to="/login" />;
}
