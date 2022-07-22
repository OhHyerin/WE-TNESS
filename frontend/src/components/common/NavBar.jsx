import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SearchForm from '../search/SearchForm';
import AccountMenu from './Dropdown';

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  height: 45px;
  padding: 2px;
  gap: 10px;
  background: var(--primary-color);
`;

const LoginMenu = styled.div`
  width: 120px;
`;

export default function NavBar() {
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);

  return (
    <Nav>
      <Link to="/">Home</Link>
      <SearchForm></SearchForm>
      <div>
        {isAuthenticated ? (
          <LoginMenu>
            <AccountMenu />
          </LoginMenu>
        ) : (
          <LoginMenu>
            <Link to="/signup">회원가입</Link>
            <Link to="/login">로그인</Link>
          </LoginMenu>
        )}
      </div>
    </Nav>
  );
}
