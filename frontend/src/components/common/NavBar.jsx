import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchForm from '../search/SearchForm';
import AccountMenu from './Dropdown';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  /* background: var(--prim-bg-color); */
  background-color: grey;
`;
const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  background: var(--sec-bg-color);
`;
const NavBtns = styled.div`
  padding-left: 20px;
  a {
    text-decoration: none;
    font-size: 20px;
    padding: 0px 10px;
  }
`;

const LoginMenu = styled.div`
  width: 144px;
  a {
    text-decoration: none;
    padding: 0px 8px;
  }
`;

export default function NavBar() {
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);

  return (
    <>
      <Header>
        <Link to="/">Logo</Link>
        <SearchForm />
        <div>
          {isAuthenticated ? (
            <LoginMenu>
              {/* 알림 - 임시 & 수정 필요 */}
              <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
                <Badge badgeContent={17} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              {/* 계정 버튼 - 드롭다운 */}
              <AccountMenu />
            </LoginMenu>
          ) : (
            <LoginMenu>
              <Link to="/signup">회원가입</Link>
              <Link to="/login">로그인</Link>
            </LoginMenu>
          )}
        </div>
      </Header>
      <Nav>
        <NavBtns>
          <Link to="/">홈</Link>
          <Link to="history/:userNickname">기록</Link>
          <Link to="ranking">랭킹</Link>
        </NavBtns>
        <div></div>
      </Nav>
    </>
  );
}
