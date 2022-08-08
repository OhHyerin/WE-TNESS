import { Navigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import OpvSession from 'openvidu-react';

export default function Room() {
  const params = useParams();
  const roomNumber = parseInt(params.roomId, 10);

  // 방 정보 입력
  const mySessionId = useSelector(state => state.room.sessionInfo.mySessionId);
  const myUserName = useSelector(state => state.room.sessionInfo.myUserName);
  const token = useSelector(state => state.room.sessionInfo.token);

  const isAuthenticated = useSelector(state => state.user.isAuthenticated);

  function handlerJoinSessionEvent(event) {
    // Do something
  }

  function handlerLeaveSessionEvent(event) {
    // Do something
  }

  function handlerErrorEvent(event) {
    // Do something
  }

  if (isAuthenticated) {
    return (
      <div>
        <h1>{roomNumber}번 방입니다.</h1>
        <OpvSession
          id="opv-session"
          sessionName={mySessionId}
          user={myUserName}
          token={token}
          joinSession={handlerJoinSessionEvent}
          leaveSession={handlerLeaveSessionEvent}
          error={handlerErrorEvent}
        />
      </div>
    );
  }
  return <Navigate to="/login" />;
}
