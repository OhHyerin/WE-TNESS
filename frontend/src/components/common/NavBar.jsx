import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SearchForm from '../search/SearchForm';
import AccountMenu from './Dropdown';

const Nav = styled.div`
  display: flex;
  gap: 10px;
`;

export default function NavBar() {
  const isLogin = useSelector(state => state.user.isLogin);

  return (
    <Nav>
      <Link to="/">Home</Link>
      <SearchForm></SearchForm>
      <div>
        {isLogin ? (
          <div>
            <AccountMenu />
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
