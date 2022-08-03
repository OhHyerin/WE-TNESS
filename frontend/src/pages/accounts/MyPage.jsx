import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '@mui/material';
import FormBox from '../../components/common/auth/FormBox';
import FollowingList from '../../components/myPage/FollowingList';
import FollowerList from '../../components/myPage/FollowerList';
import { fetchFollowList } from '../../features/user/UserSlice';

const ContentBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const TitleBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: end;
`;

const FollowBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 50px;
  width: 50%;
  justify-content: space-evenly;
`;

export default function MyPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFollowList());
  });

  const followerList = useSelector(state => state.user.followList?.followerList);
  const followingList = useSelector(state => state.user.followList?.followingList);

  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  // if (isAuthenticated) {
  return (
    <ContentBox>
      <FormBox>
        <TitleBox>
          <Button>
            <Link to={'/edit'}>개인정보 수정</Link>
          </Button>
        </TitleBox>
        <FollowBox>
          <FollowingList followingList={followingList} />
          <FollowerList followerList={followerList} />
        </FollowBox>
      </FormBox>
    </ContentBox>
  );
  // }
  // return <Navigate to='/login'/>;
}
