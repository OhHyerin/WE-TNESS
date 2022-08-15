import React, { Component } from 'react';
import { IoMicOutline, IoMicOffOutline } from 'react-icons/io5';
import styled from 'styled-components';
import { Chip } from '@mui/material';
import OpenViduVideoComponent from './OvVideo';
import './UserVideo.css';

const MyInfoBox = styled.div`
  display: flex;
  width: 100%;
  padding-top: 5px;
  justify-content: space-between;
  align-items: center;
`;

const MicVideoBtn = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export default class UserVideoComponent extends Component {
  getNicknameTag() {
    // Gets the nickName of the user
    return JSON.parse(this.props.streamManager.stream.connection.data).nickname;
  }

  render() {
    return (
      <div>
        {this.props.streamManager !== undefined ? (
          <div className="streamcomponent">
            <OpenViduVideoComponent streamManager={this.props.streamManager} />
            {this.props.isMe ? (
              <div></div>
            ) : (
              <MyInfoBox>
                <Chip label={this.getNicknameTag()} variant="outlined" />

                {/* 마이크 & 카메라 onOff */}
                <MicVideoBtn>
                  {this.props.streamManager.stream.audioActive ? (
                    <IoMicOutline color="#009688" size="24" />
                  ) : (
                    <IoMicOffOutline color="#e91515" size="24" />
                  )}
                </MicVideoBtn>
              </MyInfoBox>
            )}
          </div>
        ) : null}
      </div>
    );
  }
}
