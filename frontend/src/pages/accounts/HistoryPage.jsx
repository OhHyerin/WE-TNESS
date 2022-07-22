import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function UserHistory() {
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  if (isAuthenticated) {
    return (
      <div>
        <h1>운동 현황 페이지</h1>
      </div>
    );
  }
  return <Navigate to='/login'/>;
}
