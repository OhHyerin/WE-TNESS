import React, { Component, useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { OpenVidu } from 'openvidu-browser';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { styled as styledC } from '@mui/material';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { TurnedIn } from '@mui/icons-material';
import UserVideoComponent from './UserVideoComponent';
import { getSessionInfo } from '../../features/Token';
import SubmitBtn from '../../components/common/SubmitBtn';
import { createRoom } from '../../features/room/RoomSlice';
import setConfig from '../../features/authHeader';
import api from '../../api';

const Container = styled.div`
  padding: 0;
`;

const VideoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 50px;
`;

// docker run -p 4443:4443 --rm -e OPENVIDU_SECRET=WETNESS openvidu/openvidu-server-kms:2.22.0
// url :
const OPENVIDU_SERVER_URL = 'https://' + window.location.hostname + ':4443';
const OPENVIDU_SERVER_SECRET = 'WETNESS';

function RoomPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sessionInfo = getSessionInfo();
  const nickname = useSelector(state => state.user.currentUser.nickname);
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);

  // ui 작업을 위해 임시로 새로고침 시 방 생성 구현
  // useEffect(() => {
  //   const payload = {
  //     workoutId: 3,
  //     password: '',
  //     title: 'gd',
  //   };
  //   dispatch(createRoom(payload));
  // }, [dispatch]);

  if (isAuthenticated) {
    if (sessionInfo) {
      return <RoomClass sessionInfo={sessionInfo} nickname={nickname} navigate={navigate}></RoomClass>;
    }
    return <div>세션정보없음</div>;
  }
  return <Navigate to="/login" />;
}

class RoomClass extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: undefined,
      title: undefined,
      managerNickname: undefined,
      myUserName: undefined,
      session: undefined,
      mainStreamManager: undefined,
      publisher: undefined,
      subscribers: [],
      currentVideoDevice: undefined,

      isFinish: undefined,
      rank: [],
      isReady: undefined,
      readyState: new Map(),
      isPossibleStart: true,
    };

    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.switchCamera = this.switchCamera.bind(this);
    this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);

    // 커스텀
    this.join = this.join.bind(this);
    this.startSignal = this.startSignal.bind(this);
    this.start = this.start.bind(this);
    this.readySignal = this.readySignal.bind(this);
    this.checkPossibleStart = this.checkPossibleStart.bind(this);
  }

  // state 업데이트 & 세션 입장 (sessionId랑 token 따로 빼서? => 백에서 준 토큰으로 입장 )
  componentDidMount() {
    window.addEventListener('beforeunload', this.onbeforeunload);
    const { sessionInfo, nickname } = this.props;
    setTimeout(() => {
      this.setState({
        token: sessionInfo.token,
        title: sessionInfo.title,
        myUserName: nickname,
        managerNickname: sessionInfo.managerNickname,
        isGaming: false,
      });
    }, 300);
    this.joinSession(sessionInfo.token);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.onbeforeunload);
  }

  onbeforeunload(event) {
    this.leaveSession();
  }

  handleMainVideoStream(stream) {
    if (this.state.mainStreamManager !== stream) {
      this.setState({
        mainStreamManager: stream,
      });
    }
  }

  deleteSubscriber(streamManager) {
    const { subscribers } = this.state;
    const index = subscribers.indexOf(streamManager, 0);
    if (index > -1) {
      subscribers.splice(index, 1);
      this.setState({
        subscribers,
      });
    }
  }

  joinSession(token) {
    // --- 1) Get an OpenVidu object ---

    this.OV = new OpenVidu();

    // --- 2) Init a session ---
    this.setState(
      {
        session: this.OV.initSession(),
      },
      () => {
        const mySession = this.state.session;

        // --- 3) Specify the actions when events take place in the session ---

        // On every new Stream received...
        mySession.on('streamCreated', event => {
          // Subscribe to the Stream to receive it. Second parameter is undefined
          // so OpenVidu doesn't create an HTML video by its own
          const subscriber = mySession.subscribe(event.stream, undefined);
          const { subscribers } = this.state;
          subscribers.push(subscriber);

          // Update the state with the new subscribers
          this.setState({
            subscribers,
          });
        });

        // On every Stream destroyed...
        mySession.on('streamDestroyed', event => {
          // Remove the stream from 'subscribers' array
          this.deleteSubscriber(event.stream.streamManager);
        });

        // On every asynchronous exception...
        mySession.on('exception', exception => {
          console.warn(exception);
        });

        mySession.on('signal:join', event => {
          this.readyState.set(event.data, false);
        });

        mySession.on('signal:start', event => {
          this.setState({
            gameId: event.data,
          });
          this.start();
        });

        mySession.on('signal:ready', event => {
          const data = event.data.split(',');
          this.readyState.set(data[0], data[1]);
          this.checkPossibleStart();
        });

        // --- 4) Connect to the session with a valid user token ---

        // 'getToken' method is simulating what your server-side should do.
        // 'token' parameter should be retrieved and returned by your own backend

        // this.getToken().then(token => {
        // First param is the token got from OpenVidu Server. Second param can be retrieved by every user on event
        // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
        mySession
          .connect(token)
          // , { clientData: this.state.myUserName }
          .then(async () => {
            this.join();
            const devices = await this.OV.getDevices();
            const videoDevices = devices.filter(device => device.kind === 'videoinput');

            console.log(this.state.session);
            // --- 5) Get your own camera stream ---

            // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
            // element: we will manage it on our own) and with the desired properties
            const publisher = this.OV.initPublisher(undefined, {
              audioSource: undefined, // The source of audio. If undefined default microphone
              videoSource: undefined, // The source of video. If undefined default webcam
              // videoDevices[0].deviceId,
              publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
              publishVideo: true, // Whether you want to start publishing with your video enabled or not
              resolution: '640x480', // The resolution of your video
              frameRate: 30, // The frame rate of your video
              insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
              mirror: false, // Whether to mirror your local video or not
            });

            // --- 6) Publish your stream ---

            mySession.publish(publisher);

            // Set the main video in the page to display our webcam and store our Publisher
            this.setState({
              currentVideoDevice: videoDevices[0],
              mainStreamManager: publisher,
              publisher,
            });
          })
          .catch(error => {
            console.log('There was an error connecting to the session:', error.code, error.message);
          });
        // });
      }
    );
  }

  join() {
    const mySession = this.state.session;
    if (this.state.myUserName !== this.state.managerNickname) {
      mySession.signal({
        data: this.state.myUserName,
        type: 'join',
      });
    }
  }

  start() {
    console.log('게임 시작');
    this.setState({
      isGaming: true,
      rank: [],
    });
  }

  startSignal() {
    console.log(this.isPossibleStart);
    const mySession = this.state.session;
    const data = new Date();

    // 타이틀 수정 후  roomId: this.state.title,
    const roomId = 123;
    const createDate = [
      data.getFullYear(),
      data.getMonth(),
      data.getDay(),
      data.getHours(),
      data.getMinutes(),
      data.getSeconds(),
    ];
    const payload = {
      roomId,
      createDate,
    };
    axios
      .post(api.start(), payload, setConfig())
      .then(res => {
        console.log(res.data);
        mySession.signal({
          data: res.data.gameId,
          type: 'start',
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  readySignal() {
    const mySession = this.state.session;

    this.setState({
      isReady: !this.state.isReady,
    });

    mySession.signal({
      data: `${this.state.myUserName},${this.state.isReady}`,
      type: 'ready',
    });
  }

  // 레디가 다 되었는지 확인
  checkPossibleStart() {
    if (this.myUserName === this.managerNickname) {
      if (this.readyState.every((value, key) => value)) {
        this.setState({
          isPossibleStart: true,
        });
      }
    }
  }

  leaveSession() {
    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---

    const mySession = this.state.session;

    if (mySession) {
      mySession.disconnect();
    }
    axios
      .patch(
        api.quit(),
        {
          nickname: this.state.myUserName,
          title: this.state.title,
        },
        setConfig()
      )
      .then(() => {
        // Empty all properties...
        this.OV = null;
        this.setState({
          session: undefined,
          subscribers: [],
          mySessionId: undefined,
          myUserName: undefined,
          mainStreamManager: undefined,
          publisher: undefined,
        });
      })
      .catch(err => {
        console.log(err);
      });

    this.props.navigate('/');
  }

  async switchCamera() {
    try {
      const devices = await this.OV.getDevices();
      const videoDevices = devices.filter(device => device.kind === 'videoinput');

      if (videoDevices && videoDevices.length > 1) {
        const newVideoDevice = videoDevices.filter(
          device => device.deviceId !== this.state.currentVideoDevice.deviceId
        );

        if (newVideoDevice.length > 0) {
          // Creating a new publisher with specific videoSource
          // In mobile devices the default and first camera is the front one
          const newPublisher = this.OV.initPublisher(undefined, {
            videoSource: newVideoDevice[0].deviceId,
            publishAudio: true,
            publishVideo: true,
            mirror: true,
          });

          // newPublisher.once("accessAllowed", () => {
          await this.state.session.unpublish(this.state.mainStreamManager);

          await this.state.session.publish(newPublisher);
          this.setState({
            currentVideoDevice: newVideoDevice,
            mainStreamManager: newPublisher,
            publisher: newPublisher,
          });
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    const { title, myUserName, isGaming, managerNickname, isPossibleStart, isReady } = this.state;

    return (
      <Container>
        {this.state.session === undefined ? (
          <div>세션정보없어용</div>
        ) : (
          <div id="session">
            <div id="session-header">
              <h1 id="session-title">방 제목 :{title}</h1>
              <input
                className="btn btn-large btn-danger"
                type="button"
                id="buttonLeaveSession"
                onClick={this.leaveSession}
                value="Leave session"
              />
            </div>

            {/* 타이머 & 시작버튼 */}
            {isGaming ? (
              <Timer></Timer>
            ) : myUserName === managerNickname ? (
              <SubmitBtn onClick={this.startSignal} disabled={!isPossibleStart} deactive={!isPossibleStart}>
                시작!
              </SubmitBtn>
            ) : (
              <SubmitBtn onClick={this.readySignal}>준비 !</SubmitBtn>
            )}

            {/* 실시간 순위 & 최종 순위 */}
            <div></div>

            {/* 내 화면 */}
            <VideoContainer>
              {this.state.publisher !== undefined ? (
                <div>
                  <div className="stream-container" onClick={() => this.handleMainVideoStream(this.state.publisher)}>
                    <UserVideoComponent streamManager={this.state.publisher} />
                  </div>
                  <p>내 닉네임 : {myUserName}</p>
                </div>
              ) : null}

              {/* 친구들 화면 */}
              {this.state.subscribers.map((sub, i) => (
                <div key={i} className="stream-container" onClick={() => this.handleMainVideoStream(sub)}>
                  <UserVideoComponent streamManager={sub} />
                </div>
              ))}
            </VideoContainer>
          </div>
        )}
      </Container>
    );
  }
}

export default RoomPage;

// 1분 타이머
const Timer = () => {
  const [value, setValue] = useState(60);
  useEffect(() => {
    const myInterval = setInterval(() => {
      if (value > 0) {
        setValue(value - 0.1);
      }
      if (value <= 0) {
        clearInterval(myInterval);
      }
    }, 100);
    return () => {
      clearInterval(myInterval);
    };
  });

  return (
    <>
      <CustomizedProgressBars value={value}></CustomizedProgressBars>
    </>
  );
};

const HurryLinearProgress = styledC(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#f44336' : '#f44336',
  },
}));

const BorderLinearProgress = styledC(LinearProgress)(({ theme }) => ({
  height: 20,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
}));

function CustomizedProgressBars(props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <p>남은 시간 : {props.value}</p>
      {props.value <= 30 ? (
        <HurryLinearProgress variant="determinate" value={(props.value * 100) / 60} />
      ) : (
        <BorderLinearProgress variant="determinate" value={(props.value * 100) / 60} />
      )}
    </Box>
  );
}
