import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { switchLoginState } from '../../features/user/userSlice';
import SearchForm from '../search/SearchForm';

const Nav = styled.div`
  display: flex;
  gap: 10px;
`;

export default function NavBar() {
  const isLogin = useSelector(state => state.user.isLogin);
  const userNickname = useSelector(state => state.user.nickname);
  const dispatch = useDispatch();
  return (
    <Nav>
      <Link to="/">Home</Link>
      <SearchForm></SearchForm>
      <div>
        {isLogin ? (
          <div>
            <Link to={`/${userNickname}`}>내 운동 현황</Link>
            <div>
              <button
                onClick={() => {
                  dispatch(switchLoginState());
                }}>
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div>
            <Link to="/signup">회원가입</Link>
            <Link to="/login">로그인</Link>
          </div>
        )}
      </div>
    </Nav>
  );
}
