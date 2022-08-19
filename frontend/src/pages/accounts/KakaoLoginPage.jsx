import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Navigate } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import { kakaoLogin } from '../../features/user/UserSlice';
import { toggleIsModal } from '../../features/user/SignupSlice';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export default function KakaoLoginPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const KAKAO_CODE = location.search.split('=')[1];
  const [isLogin, setIsLogin] = useState(false);

  const kakaoInfo = useSelector(state => state.user.kakaoInfo);

  useEffect(() => {
    dispatch(kakaoLogin(KAKAO_CODE)).then(() => {
      if (!kakaoInfo.existUser) {
        dispatch(toggleIsModal());
      }
      MySwal.fire({
        title: <p>로그인</p>,
        text: '처음이시라면 개인정보에서 닉네임을 수정해보세요!',
        icon: 'success',
      });
      setIsLogin(true);
    });
  });
  if (isLogin) {
    return <Navigate to="/" />;
  }
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '100px',
      }}>
      <CircularProgress />
    </Box>
  );
}
