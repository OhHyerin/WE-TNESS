import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom"
import { kakaoLogin } from "../../features/user/UserSlice";
import { toggleIsModal } from '../../features/user/SignupSlice'

export default function KakaoLoginPage() {
  const dispatch = useDispatch()
  const location = useLocation();
  const KAKAO_CODE = location.search.split('=')[1];
  const [isLogin, setIsLogin] = useState(false)

  const kakaoInfo = useSelector(state => state.user.kakaoInfo)

  useEffect(() => {
    console.log(KAKAO_CODE)
    dispatch(kakaoLogin(KAKAO_CODE))
      .then(() => {
        if (!kakaoInfo.exist_user) {
          dispatch(toggleIsModal())
        }
        setIsLogin(true)
      })
      .catch(err => {
        console.log(err)
      })
  })
  if (isLogin) {
      return (
        <Navigate to="/" />
      )
    }
  return (
    <div>
      <p>카카오 로그인 중 ^~^</p>
    </div>
  )
}