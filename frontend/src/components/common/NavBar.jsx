import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation, Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import SearchForm from '../search/SearchForm';
import AccountMenu from './Dropdown';
import logo from '../../assets/images/logo.jpg';
import { setIsRoom } from '../../features/room/RoomSlice';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  background: var(--prim-bg-color);
  font-weight: 700;
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
    font-size: 18px;
    font-weight: 700;
    padding: 0px 10px;
  }
`;

const LoginMenu = styled.div`
  width: 180px;
  a {
    text-decoration: none;
    padding: 0px 8px;
  }
`;

const Logo = styled.div`
  > * {
    margin: 0px 15px;
  }
`;

export default function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isRoom = useSelector(state => state.room.isRoom);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isRoom && location.pathname == '/room') {
      dispatch(setIsRoom(true));
    } else {
      dispatch(setIsRoom(false));
    }
  }, [location]);

  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  const userNickname = useSelector(state => state.user.currentUser.nickname);

  const handleGoOut = () => {
    // 방나가는 로직 (게임방 삭제)
    // dispatch(setIsRoom(false));
    navigate('/');
  };

  return (
    <div id="nav">
      <Header>
        {/* null 자리에 방정보, 나가는 버튼 넣기 */}
        {isRoom ? (
          <>
            <Logo>
              <img src={logo} alt="Logo" width={'40px'} height={'auto'} />
            </Logo>
            <div>방정보</div>
            <Button id="goOutBtn" variant="contained" color="error" onClick={handleGoOut}>
              나가기
            </Button>
          </>
        ) : (
          <>
            <Logo>
              <Link to="/">
                <img src={logo} alt="Logo" width={'40px'} height={'auto'} />
              </Link>
            </Logo>

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
          </>
        )}
      </Header>

      {isRoom ? null : (
        <Nav>
          <NavBtns>
            <Link to="/">홈</Link>
            <Link to={`history/${userNickname}`}>기록</Link>
            <Link to="ranking">랭킹</Link>
          </NavBtns>
          <div></div>
        </Nav>
      )}
    </div>
  );
}
