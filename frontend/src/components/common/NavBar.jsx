import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation, Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import SearchForm from '../search/SearchForm';
import AccountMenu from './Dropdown';
import logo from '../../assets/images/logo.jpg';
import { setIsRoom } from '../../features/room/RoomSlice';
import Notifications from './Notifications';

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
  const nowRoom = useSelector(state => state.room.nowRoom);
  const dispatch = useDispatch();

  useEffect(() => {
    if ((!isRoom && location.pathname == '/room') || location.pathname == '/tutorial') {
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
            <div>
              {nowRoom.locked ? <LockIcon fontSize="small" /> : null}
              {nowRoom.workout === 1
                ? '[운동1]'
                : nowRoom.workout === 2
                ? '[운동2]'
                : nowRoom.workout === 2
                ? '[운동3]'
                : null}
              {nowRoom.title}{' '}
            </div>
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
                  <Badge badgeContent={17} color="error">
                    <Notifications />
                  </Badge>
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
            {userNickname ? <Link to={`history/${userNickname}`}>기록</Link> : <Link to={`history/1`}>기록</Link>}
            <Link to="ranking">랭킹</Link>
          </NavBtns>
          <div></div>
        </Nav>
      )}
    </div>
  );
}
