import { useSelector } from 'react-redux';
import LoginPleasePage from './LoginPleasePage';

export default function UserHistory() {
  const isLogin = useSelector(state => state.user.isLogin);
  if (isLogin) {
    return (
      <div>
        <h1>운동 현황 페이지</h1>
      </div>
    );
  }
  return <LoginPleasePage></LoginPleasePage>;
}
