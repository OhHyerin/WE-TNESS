import { useDispatch } from 'react-redux';
import { switchLoginState } from '../../features/user/userSlice';
import KAKAO_AUTH_URL from '../../api/Oauth';
import KakaoLoginBar from '../../components/common/login/KakaoLoginBar';


export default function Room() {
  const dispatch = useDispatch();
  return (
    <div>
      <h1>로그인페이지임당</h1>
      <button
        onClick={() => {
          dispatch(switchLoginState());
        }}>
        로그인 해봐요
      </button>
      <KakaoLoginBar href={KAKAO_AUTH_URL}/>
    </div>
  );
}
