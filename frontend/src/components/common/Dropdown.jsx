import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../features/user/UserSlice';

export default function AccountMenu() {
  const userNickname = useSelector(state => state.user.currentUser.nickname);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Tooltip title={`Signed in as ${userNickname}`}>
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}>
          <Avatar sx={{ width: 32, height: 32 }}>ID</Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
        <Link to={`/history/${userNickname}`}>
          <MenuItem>내 운동 현황</MenuItem>
        </Link>
        <Link to="/ranking">
          <MenuItem>랭킹 페이지</MenuItem>
        </Link>
        <Link to={`/mypage`}>
          <MenuItem>마이 페이지</MenuItem>
        </Link>
        <Link to={`/admin/user`}>
          <MenuItem>관리자 페이지</MenuItem>
        </Link>
        <MenuItem
          onClick={() => {
            dispatch(logout());
          }}>
          로그아웃
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
