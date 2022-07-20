import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LoginPleasePage from './LoginPleasePage';

export default function MyPage() {
  const isLogin = useSelector(state => state.user.isLogin);
  if (isLogin) {
    return (
      <div>
        <h1>마이페이지</h1>
        <Link to={'/edit'}>회원정보 수정</Link>
      </div>
    );
  }
  return <LoginPleasePage />;
}
