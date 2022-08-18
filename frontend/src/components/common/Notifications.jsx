import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../features/user/UserSlice';
import NotificationsIcon from '@mui/icons-material/Notifications';
import awards from './../../assets/data/awardItems';
import styled from 'styled-components';
import { Divider, MenuItem } from '@mui/material';
import { checkNotice, fetchNotice } from '../../features/notice/NoticeSlice';

const Tile = styled.div`
  display: flex;
  flex-direction: column;

  .title {
    font-size: 20px;
  }

  .text {
    font-size: 12px;
  }
`;

const MySwal = withReactContent(Swal);

export default function Notifications(props) {
  const userNickname = useSelector(state => state.user.currentUser.nickname);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const handleClick = event => {
    if (props.notices.length > 0) setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNoticeCheck = e => {
    const payload = { notificationId: e.id };
    dispatch(checkNotice(payload)).then(() => dispatch(fetchNotice()));
  };
  return (
    <React.Fragment>
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{ ml: 2 }}
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}>
        <NotificationsIcon />
      </IconButton>
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
        {props.notices.map((notice, idx) => (
          <div key={idx}>
            <MenuItem onClick={() => handleNoticeCheck(notice)}>
              {notice.type === 'invite' ? (
                <Tile>
                  <div className="title">초대 알림</div>
                  <div className="text">
                    - {notice.sender}님이 {notice.roomCode}번 방으로 초대
                  </div>
                </Tile>
              ) : notice.type === 'follow' ? (
                <Tile>
                  <div className="title">팔로우 알림 </div>
                  <div className="text">- {notice.sender}님이 팔로우 요청</div>
                </Tile>
              ) : (
                <Tile>
                  <div className="title">도전과제 알림 </div>
                  <div className="text">- {awards[notice.badge - 1].description}</div>
                </Tile>
              )}
            </MenuItem>
            {props.notices.length - 1 === idx ? null : <Divider />}
          </div>
        ))}
      </Menu>
    </React.Fragment>
  );
}
