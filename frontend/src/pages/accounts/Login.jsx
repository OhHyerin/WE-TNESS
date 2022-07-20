import { useDispatch } from 'react-redux';
import { switchLoginState } from '../../features/user/userSlice';
import KAKAO_AUTH_URL from '../../api/Oauth';
import InputBox from '../../components/common/InputBox'
import CommonLoginBar from '../../components/common/login/CommonLoginBar';
import KakaoLoginBar from '../../components/common/login/KakaoLoginBar';

export default function Login() {
  const dispatch = useDispatch();
  return (
    <div>
      <InputBox>
        <h1>로그인페이지임당</h1>
        <CommonLoginBar
          onClick={() => {
            dispatch(switchLoginState());
          }}>
          로그인 해봐요
        </CommonLoginBar>
        <a href={KAKAO_AUTH_URL}>
          <KakaoLoginBar/>
        </a>
      </InputBox>
    </div>
  );
}
