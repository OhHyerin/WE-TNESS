import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Navigate } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import { kakaoLogin } from '../../features/user/UserSlice';
import { toggleIsModal } from '../../features/user/SignupSlice';

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
