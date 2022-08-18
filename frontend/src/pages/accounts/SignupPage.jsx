import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { signup, checkNickname, checkEmail, fetchNickname, fetchEmail } from '../../features/user/SignupSlice';
import PageBox from '../../components/common/auth/PageBox';
import FormBox from '../../components/common/auth/FormBox';
import InputBox from '../../components/common/auth/InputBox';
import SubmitBtn from '../../components/common/SubmitBtn';
import PasswordForm from '../../components/common/auth/PasswordForm';
import IconTextField from '../../components/common/IconTextField';
import CheckBtn from '../../components/common/CheckBtn';
import logo from '../../assets/images/logo.jpg';

const MySwal = withReactContent(Swal);

const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 100px;
  padding: 10px;
  gap: 15px;
`;

export default function SignupPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userInfo = useSelector(state => state.signup.userInfo);
  const isPossibleNickname = useSelector(state => state.signup.isPossibleNickname);
  const isPossibleEmail = useSelector(state => state.signup.isPossibleEmail);
  const [isSignupError, setIsSignupError] = useState(false);
  const errorMsg = useSelector(state => state.signup.errorMsg);

  const [isCheckNN, setIsCheckNN] = useState(false);
  const [isCheckEmail, setIsCheckEmail] = useState(false);

  const onNicknameHandler = e => {
    setIsCheckNN(false);
    dispatch(fetchNickname(e.target.value));
  };
  const onEmailHandler = e => {
    setIsCheckEmail(false);
    dispatch(fetchEmail(e.target.value));
  };

  function onCheckNicknameHandler(e) {
    e.preventDefault();
    const payload = userInfo.nickname;
    dispatch(checkNickname(payload)).then(() => {
      setIsCheckNN(true);
    });
  }

  function onCheckEmailHandler(e) {
    e.preventDefault();
    const payload = userInfo.email;
    dispatch(checkEmail(payload)).then(() => {
      setIsCheckEmail(true);
    });
  }

  function onSubmitHandler(e) {
    e.preventDefault();
    const payload = {
      email: userInfo.email,
      nickname: userInfo.nickname,
      password: userInfo.password,
    };
    dispatch(signup(payload))
      .then(res => {
        if (res.type === 'signup/fulfilled') {
          MySwal.fire({
            title: <p>환영합니다!</p>,
            titleText: <p>로그인 해주세요!</p>,
            icon: 'success',
          });
          navigate('/login');
        } else {
          setIsSignupError(true);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <PageBox>
      <FormBox>
        <SignupForm onSubmit={onSubmitHandler}>
          <h1>회원가입</h1>
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
            <IconTextField
              error={isCheckEmail && !isPossibleEmail}
              iconEnd={
                userInfo.email ? (
                  <CheckBtn onClick={onCheckEmailHandler}>확인</CheckBtn>
                ) : (
                  <CheckBtn disabled deactive={!userInfo.email}>
                    확인
                  </CheckBtn>
                )
              }
              type="email"
              label="*이메일"
              value={userInfo.email}
              onChange={onEmailHandler}
              helperText={
                isCheckEmail ? (
                  isPossibleEmail ? (
                    '사용 가능한 이메일입니다.'
                  ) : errorMsg ? (
                    <p>{errorMsg}</p>
                  ) : (
                    '사용중인 이메일입니다.'
                  )
                ) : null
              }
            />
          </InputBox>

          <PasswordForm isError={isSignupError}></PasswordForm>

          <SubmitBtn
            disabled={
              !isCheckNN ||
              !isPossibleNickname ||
              !isCheckEmail ||
              !isPossibleEmail ||
              userInfo.password !== userInfo.pwdVerify ||
              userInfo.password === ''
            }
            deactive={
              !isCheckNN ||
              !isPossibleNickname ||
              !isCheckEmail ||
              !isPossibleEmail ||
              userInfo.password !== userInfo.pwdVerify ||
              userInfo.password === ''
            }>
            회원가입
          </SubmitBtn>
        </SignupForm>
        <p>
          회원이신가요? <Link to="/login">로그인</Link>{' '}
        </p>
      </FormBox>
      <FormBox>
        <img src={logo} alt="로고이미지" />
      </FormBox>
    </PageBox>
  );
}
