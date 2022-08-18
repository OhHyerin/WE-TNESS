import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Avatar, Modal, Box } from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ClearIcon from '@mui/icons-material/Clear';
import styled from 'styled-components';
import { fetchFollowerList, fetchFollowingList, fetchFollowState, toggleFollow } from '../../features/user/UserSlice';
import FollowerList from './FollowerList';
import FollowingList from './FollowingList';

const ProfileBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0px;
`;

const FollowForm = styled.div`
  padding: 10px 0px;
`;

const FollowBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  gap: 5px;
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
  flex-direction: column;
`;

const TotalMatch = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  > * {
    padding: 10px;
    font-size: 20px;
    font-weight: bold;
  }
`;

const Match = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  gap: 3px;
  padding: 10px;
  width: 100px;
`;

const FollowButton = styled.div`
  width: fit-content;
  :hover {
    cursor: pointer;
  }
`;

const MatchBox = styled.div`
  display: flex;
`;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: 'fit-contents',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '1px solid var(--primary-color)',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

const closeStyle = {
  position: 'absolute',
  top: '5px',
  right: '5px',
  '&:hover': {
    cursor: 'pointer',
    opacity: '80%',
  },
};

export default function UserProfile(props) {
  const dispatch = useDispatch();

  const followerList = useSelector(state => state.user.followerList);
  const followingList = useSelector(state => state.user.followingList);
  const matches = useSelector(state => state.history.matches);
  const followState = useSelector(state => state.user.followState);
  const myNickname = useSelector(state => state.user.currentUser.nickname);

  useEffect(() => {
    dispatch(fetchFollowerList(props.userNickname));
    dispatch(fetchFollowingList(props.userNickname));
    if (!(myNickname === props.userNickname)) {
      dispatch(fetchFollowState(props.userNickname));
    }
  }, [dispatch, props.userNickname, myNickname]);

  const [openFollower, setOpenFollower] = useState(false);
  const [openFollowing, setOpenFollowing] = useState(false);

  // 팔로워 핸들러
  const handleOpenFollower = () => setOpenFollower(true);
  const handleCloseFollower = () => setOpenFollower(false);

  // 팔로잉 핸들러
  const handleOpenFollowing = () => setOpenFollowing(true);
  const handleCloseFollowing = () => setOpenFollowing(false);

  function toggleFollowState() {
    dispatch(toggleFollow(props.userNickname)).then(() => {
      dispatch(fetchFollowerList(props.userNickname));
      dispatch(fetchFollowingList(props.userNickname));
    });
  }

  return (
    <ProfileBox>
      <Profile>
        <Avatar sx={{ alignSelf: 'start', width: 88, height: 88 }}>{props.userNickname}</Avatar>
        <div>
          <Nickname>{props.userNickname}</Nickname>
          {myNickname === props.userNickname ? null : (
            <FollowButton onClick={() => toggleFollowState()}>
              {followState ? (
                <FollowBox>
                  <RemoveCircleOutlineIcon color="error"></RemoveCircleOutlineIcon>
                  <p>unFollow</p>
                </FollowBox>
              ) : (
                <FollowBox>
                  <AddCircleOutlineIcon color="info"></AddCircleOutlineIcon>
                  <p>Follow</p>
                </FollowBox>
              )}
            </FollowButton>
          )}
          <FollowForm>
            <FollowBtn onClick={handleOpenFollower}>
              <div> 팔로워 {followerList.length} </div>
            </FollowBtn>
            <FollowBtn onClick={handleOpenFollowing}>
              <p style={{}}> 팔로잉 {followingList.length}</p>
            </FollowBtn>
          </FollowForm>
        </div>
        <MatchTile>
          <TotalMatch>
            <p>총 경기 수</p>
            <p>{matches.totalCnt}</p>
          </TotalMatch>
          <MatchBox>
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
          </MatchBox>
        </MatchTile>
      </Profile>

      {/* 모달 - 팔로워, 팔로잉 */}
      <Modal open={openFollower} onClose={handleCloseFollower}>
        <Box sx={style}>
          <ClearIcon sx={closeStyle} onClick={handleCloseFollower}></ClearIcon>
          <FollowerList followerList={followerList} handleCloseFollower={handleCloseFollower} />
        </Box>
      </Modal>
      <Modal open={openFollowing} onClose={handleCloseFollowing}>
        <Box sx={style}>
          <ClearIcon sx={closeStyle} onClick={handleCloseFollowing}></ClearIcon>
          <FollowingList followingList={followingList} handleCloseFollowing={handleCloseFollowing} />
        </Box>
      </Modal>
    </ProfileBox>
  );
}
