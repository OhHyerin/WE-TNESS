import styled from 'styled-components';
import { useSelector } from 'react-redux';
import FollowingList from './FollowingList';
import FollowerList from './FollowerList';

const FollowBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 50px;
  width: 50%;
  justify-content: space-evenly;
`;

export default function FollowForm() {
  const followerList = useSelector(state => state.user.followList?.followerList);
  const followingList = useSelector(state => state.user.followList?.followingList);
  return (
    <FollowBox>
      <FollowingList followingList={followingList} />
      <FollowerList followerList={followerList} />
    </FollowBox>
  );
}
