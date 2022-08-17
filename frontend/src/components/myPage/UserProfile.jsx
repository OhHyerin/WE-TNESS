import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Avatar, Modal } from '@mui/material';
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

const FollowBtn = styled.button`
  background: inherit;
  border: none;
  box-shadow: none;
  border-radius: 0;
  overflow: visible;
  margin: 0px 40px 5px 0px;
  font-weight: bold;
  cursor: pointer;
`;

const Nickname = styled.div`
  font-size: 30px;
  margin: 0px 0px 10px 0px;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  > * {
    margin: 10px;
  }
`;

const MatchTile = styled.div`
  > * {
    border-radius: 4px;
    box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
    margin: 0px 5px;
  }
  display: flex;
`;
const TotalMatch = styled.div`
  display: flex;
  align-items: center;
  > * {
    padding: 10px;
    font-size: 20px;
  }
`;
const Match = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  width: 63px;
`;

export default function UserProfile(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFollowerList());
    dispatch(fetchFollowingList());
  }, []);

  const followerList = useSelector(state => state.user.followerList);
  const followingList = useSelector(state => state.user.followingList);
  const matches = useSelector(state => state.history.matches);

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

  return (
    <>
      <Profile>
        <Avatar sx={{ width: 88, height: 88 }}>{props.userNickname}</Avatar>
        <div>
          <Nickname>{props.userNickname}</Nickname>
          <>
            <FollowBtn onClick={handleOpenFollower}>팔로워 {followerList.length}</FollowBtn>
            <FollowBtn onClick={handleOpenFollowing}>팔로잉 {followingList.length}</FollowBtn>
          </>
          <MatchTile>
            <TotalMatch>
              <div>총 경기 수</div>
              <div>{matches.totalCnt}</div>
            </TotalMatch>
            <Match>
              <div>1등</div>
              <div>{matches.gold}</div>
            </Match>
            <Match>
              <div>2등</div>
              <div>{matches.silver}</div>
            </Match>
            <Match>
              <div>3등</div>
              <div>{matches.bronze}</div>
            </Match>
          </MatchTile>
        </div>
      </Profile>

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
