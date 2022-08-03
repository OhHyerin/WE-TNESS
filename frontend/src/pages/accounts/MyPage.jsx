import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '@mui/material';
import FormBox from '../../components/common/auth/FormBox';
import FollowForm from '../../components/myPage/FollowForm';
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

export default function MyPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFollowList());
  });

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
        <FollowForm></FollowForm>
      </FormBox>
    </ContentBox>
  );
  // }
  // return <Navigate to='/login'/>;
}
