import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Button, Modal } from '@mui/material';
import styled from 'styled-components';
import { fetchFollowerList, fetchFollowingList } from '../../features/user/UserSlice';
import FollowerList from './FollowerList';
import FollowingList from './FollowingList';

const FollowBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 50px;
  width: 50%;
  justify-content: space-evenly;
`;

export default function UserProfile(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFollowerList());
    dispatch(fetchFollowingList());
  }, []);

  const followerList = useSelector(state => state.user.followerList);
  const followingList = useSelector(state => state.user.followingList);

  const [openFollower, setOpenFollower] = useState(false);
  const [openFollowing, setOpenFollowing] = useState(false);

  // 팔로워 핸들러
  const handleOpenFollower = () => {
    setOpenFollower(true);
    console.log(followerList);
  };
  const handleCloseFollower = () => setOpenFollower(false);

  // 팔로잉 핸들러
  const handleOpenFollowing = () => {
    setOpenFollowing(true);
    console.log(followingList);
  };
  const handleCloseFollowing = () => setOpenFollowing(false);

  const matches = useSelector(state => state.history.matches);

  return (
    <>
      <div>유저 네임 : {props.userNickname}</div>
      <div>
        <Button onClick={handleOpenFollower}>팔로워 :{followerList.length}</Button>
        <Button onClick={handleOpenFollowing}>팔로잉 :{followingList.length}</Button>
      </div>
      <div>
        <span>총 경기 수 : {matches.totalCnt} </span>
        <span>1등 : {matches.gold} </span>
        <span>2등 : {matches.silver} </span>
        <span>3등 : {matches.bronze} </span>
      </div>

      {/* 모달 - 팔로워, 팔로잉 */}
      <Modal open={openFollower} onClose={handleCloseFollower}>
        <FollowBox>
          <FollowerList followerList={followerList} />
        </FollowBox>
      </Modal>
      <Modal open={openFollowing} onClose={handleCloseFollowing}>
        <FollowBox>
          <FollowingList followingList={followingList} />
        </FollowBox>
      </Modal>
    </>
  );
}
