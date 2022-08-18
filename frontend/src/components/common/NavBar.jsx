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
import navLogo from '../../assets/images/navLogo.png';
import { setIsRoom } from '../../features/room/RoomSlice';
import Notifications from './Notifications';
import { fetchNotice } from '../../features/notice/NoticeSlice';
import { getAccessToken } from '../../features/Token';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  background: var(--prim-bg-color);
  font-weight: 700;
`;

const RoomHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
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

const RoomTitle = styled.div`
  padding-left: 30px;
  margin-right: 300px;
`;

const OutBtn = styled.div`
  justify-self: end;
`;

export default function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isRoom = useSelector(state => state.room.isRoom);
  const nowRoom = useSelector(state => state.room.nowRoom);
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  const userNickname = useSelector(state => state.user.currentUser.nickname);
  const notices = useSelector(state => state.notice.notices);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isRoom && location.pathname == '/room') {
      dispatch(setIsRoom(true));
    } else {
      dispatch(setIsRoom(false));
    }
    const token = getAccessToken();
    if (token) {
      dispatch(fetchNotice());
    }
  }, [dispatch, location]);

  const handleGoOut = () => {
    navigate('/');
  };

  return (
    <div id="nav">
      {isRoom ? (
        <RoomHeader>
          <Logo>
            <img style={{ marginLeft: '20px' }} src={navLogo} alt="Logo" width={'150px'} height={'auto'} />
          </Logo>
          <RoomTitle>
            {nowRoom.locked ? <LockIcon fontSize="small" /> : null} [
            {nowRoom.workout === 1 ? '운동1' : nowRoom.workout === 2 ? '운동2' : '운동3'}] {nowRoom.title}{' '}
          </RoomTitle>
          <OutBtn>
            <Button id="goOutBtn" variant="contained" color="error" onClick={handleGoOut}>
              나가기
            </Button>
          </OutBtn>
        </RoomHeader>
      ) : (
        <Header>
          <Logo>
            <Link to="/">
              <img style={{ marginLeft: '20px' }} src={navLogo} alt="Logo" width={'150px'} height={'auto'} />
            </Link>
          </Logo>

          <SearchForm />

          <div>
            {isAuthenticated ? (
              <LoginMenu>
                {/* 알림 - 임시 & 수정 필요 */}
                <Badge badgeContent={notices.length} color="error">
                  <Notifications notices={notices} />
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
        </Header>
      )}

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
