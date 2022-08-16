import React, { Component } from 'react';
import { IoMicOutline, IoMicOffOutline } from 'react-icons/io5';
import styled from 'styled-components';
import { Chip } from '@mui/material';
import OpenViduVideoComponent from './OvVideo';
import './UserVideo.css';

const ChipBox = styled.div`
  position: absolute;
  top: 1px;
  left: 1px;
`;

const MicBox = styled.ul`
  position: absolute;
  top: 1px;
  right: 1px;
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
            <ChipBox>
              <Chip variant="outlined" color="primary" label={this.getNicknameTag()} />
            </ChipBox>

            {/* 마이크 onOff 정보 */}
            <MicBox>
              {this.props.streamManager.stream.audioActive ? (
                <IoMicOutline color="#009688" size="24" />
              ) : (
                <IoMicOffOutline color="#e91515" size="24" />
              )}
            </MicBox>
          </div>
        ) : null}
      </div>
    );
  }
}
