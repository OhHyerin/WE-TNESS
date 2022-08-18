import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const FollowingBox = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid;
`;

const FollowingTitle = styled.p`
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  padding: 20px 0px;
`;

const UserBox = styled.p`
  display: flex;
  justify-content: space-between;
  padding: 5px;
  border-top: 1px solid;
  > .nickname:hover {
    cursor: pointer;
  }
  > .nickname {
    color: ${props => (props.isLogin ? 'blue' : 'red')};
  }
`;

export default function FollowingList({ followingList, handleCloseFollowing }) {
  const navigate = useNavigate();

  return (
    <FollowingBox>
      <FollowingTitle>Following</FollowingTitle>
      {followingList.map((item, i) => {
        return (
          <UserBox key={i} isLogin={item.loginState}>
            <div
              onClick={() => {
                handleCloseFollowing();
                navigate(`/history/:${item.nickname}`);
                MySwal.fire({
                  title: <p>{item.nickname}님의 기록 페이지로 이동합니다.</p>,
                  icon: 'success',
                });
              }}
              className="nickname">
              {item.nickname}
            </div>
            <p>{item.loginState ? '로그인' : '로그아웃'}</p>
          </UserBox>
        );
      })}
    </FollowingBox>
  );
}
