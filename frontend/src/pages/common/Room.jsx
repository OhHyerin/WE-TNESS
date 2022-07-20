import { Navigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Room() {
  const params = useParams();
  const roomNumber = parseInt(params.roomId, 10);

  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  if (isAuthenticated) {
    return (
      <div>
        <h1>{roomNumber}번 방입니다.</h1>
      </div>
    )
  }
  return <Navigate to='/login'/>;
}