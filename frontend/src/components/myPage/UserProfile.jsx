import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchFollowerList, fetchFollowingList } from '../../features/user/UserSlice';

export default function UserProfile(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFollowerList());
    dispatch(fetchFollowingList());
  }, []);

  const followerList = useSelector(state => state.user.followerList);
  const followingList = useSelector(state => state.user.followingList);

  return (
    <>
      <div>유저 네임 : {props.userNickname}</div>
      <div>
        <span>팔로워 : {followerList.length} </span>
        <span>팔로잉 : {followingList.length}</span>
      </div>
      <div>
        <span>총 경기 수 : </span>
        <span>1등 : </span>
        <span>2등 : </span>
        <span>3등 : </span>
      </div>
    </>
  );
}
