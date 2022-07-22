import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import FormBox from '../../components/common/auth/FormBox';
import FollowForm from '../../components/myPage/FollowForm';
import { fetchFollowList } from '../../features/user/userSlice'

export default function MyPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFollowList());
  })

  const isLogin = useSelector(state => state.user.isAuthenticated);
  if (isLogin) {
    return (
      <div>
        <FormBox>
          <h1>마이페이지</h1>
          <FollowForm></FollowForm>
          <Link to={'/edit'}>회원정보 수정</Link>
        </FormBox>
      </div>
    );
  } 
  return <Navigate to='/login'/>;
}
