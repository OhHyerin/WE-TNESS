import React, { Component, useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { OpenVidu } from 'openvidu-browser';
import axios from 'axios';
import * as tmPose from '@teachablemachine/pose';
import { useSelector } from 'react-redux';
import { styled as styledC, Box, Paper, Grid, CircularProgress } from '@mui/material';
import styled from 'styled-components';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMedal } from '@fortawesome/free-solid-svg-icons';
import UserVideoComponent from './UserVideoComponent';
import { getSessionInfo, removeSessionInfo } from '../../features/Token';
import SubmitBtn from '../../components/common/SubmitBtn';
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
  const navigate = useNavigate();

  const sessionInfo = getSessionInfo();
  const nickname = useSelector(state => state.user.currentUser.nickname);

  const isAuthenticated = useSelector(state => state.user.isAuthenticated);

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
      workoutId: undefined,
      managerNickname: undefined,
      myUserName: undefined,
      session: undefined,
      mainStreamManager: undefined,
      publisher: undefined,
      subscribers: [],
      currentVideoDevice: undefined,
      connectionErr: false,

      isModelError: undefined,

      webcam: undefined,

      isGaming: undefined,
      isFinish: undefined,
      isReady: undefined,
      readyState: new Map(),
      isPossibleStart: true,

      count: 0,
      check: undefined,

      countList: new Map(), // 유저이름, 개수 저장
      rankList: [], // 유저이름, 개수 => 1등부터 차례로 저장
    };

    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.switchCamera = this.switchCamera.bind(this);
    this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);

    // 커스텀
    this.init = this.init.bind(this);
    this.join = this.join.bind(this);
    this.startSignal = this.startSignal.bind(this);
    this.start = this.start.bind(this);
    this.readySignal = this.readySignal.bind(this);
    this.checkPossibleStart = this.checkPossibleStart.bind(this);

    // 모션 인식
    this.setModel = this.setModel.bind(this);
    this.loop = this.loop.bind(this);
    this.countSignal = this.countSignal.bind(this);
    this.squatPredict = this.squatPredict.bind(this);
  }

  // state 업데이트 => 모델 생성 & 세션 입장 (백에서 받은 token으로 입장)
  componentDidMount() {
    window.addEventListener('beforeunload', this.onbeforeunload);
    const { sessionInfo, nickname } = this.props;
    this.setState({
      token: sessionInfo.token,
      title: sessionInfo.title,
      workoutId: 1,
      count: 0,
      // workoutId: sessionInfo.workoutId,
      myUserName: nickname,
      managerNickname: sessionInfo.managerNickname,
      isGaming: false,
      isFinish: false,
    });
    setTimeout(() => {
      this.setModel();
      this.joinSession(sessionInfo.token);
    }, 1000);
    this.init();
  }

  componentWillUnmount() {
    this.leaveSession();
    console.log('leave Session');
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

        // 입장 신호 수신
        mySession.on('signal:join', event => {
          this.state.readyState.set(event.data, false);
        });

        // 시작 신호 수신
        mySession.on('signal:start', event => {
          this.setState({
            gameId: event.data,
          });
          this.start();
        });

        // 준비 신호 수신
        mySession.on('signal:ready', event => {
          const data = event.data.split(',');
          this.readyState.set(data[0], data[1]);
          this.checkPossibleStart();
        });

        // 모든 유저 1회 추가마다 수신
        mySession.on('signal:count', event => {
          const count = event.data.split(',');
          this.state.countList.set(count[0], count[1]);

          const ranks = new Map([...this.state.countList.entries()].sort((a, b) => b[1] - a[1]));
          const rankL = [];

          ranks.forEach((item, index) => {
            rankL.push({ nickname: index, count: item });
          });
          this.setState({
            rankList: rankL,
          });
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
            this.setState({ session: undefined, connectionErr: true });
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

  startSignal() {
    const mySession = this.state.session;

    const data = new Date();
    const { title } = this.state;
    const createDate = [
      data.getUTCFullYear(),
      data.getUTCMonth(),
      data.getUTCDate(),
      data.getUTCHours(),
      data.getUTCMinutes(),
      data.getUTCSeconds(),
    ];
    const payload = {
      title,
      createDate,
    };
    console.log(payload);
    axios
      .post(api.start(), payload, setConfig())
      .then(res => {
        mySession.signal({
          data: res.data.gameId,
          type: 'start',
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  start() {
    console.log('게임 시작!');
    this.setState({
      isGaming: true,
      rank: [],
    });
    setTimeout(() => {
      window.requestAnimationFrame(this.loop);
    }, 100);
  }

  // 모션 비디오
  async init() {
    console.log('학습 비디오 생성!');

    const size = 200;
    const flip = true; // whether to flip the webcam
    // eslint-disable-next-line no-undef
    const webcam = new tmPose.Webcam(size, size, flip);
    await this.setState({ webcam }); // width, height, flip

    // Convenience function to setup a webcam
    await this.state.webcam.setup(); // request access to the webcam
    this.state.webcam.play();
  }

  // 모델 생성
  async setModel() {
    console.log('모델 생성!');
    let Url = '1';
    switch (this.state.workoutId) {
      case 1: // 스쿼트
        Url = 'https://teachablemachine.withgoogle.com/models/TPlEwiz6u/';
        break;
      case 2: // 푸쉬업
        Url = 'https://teachablemachine.withgoogle.com/models/rlT_xgNAW/';
        break;
      case 3: // 버피
        Url = 'https://teachablemachine.withgoogle.com/models/759k-ZvHL/';
        break;
      case 4: // 런지
        Url = 'https://teachablemachine.withgoogle.com/models/9drs8J9Nm/';
        break;
      default:
        this.setState({
          isModelError: true,
        });
        break;
    }

    const modelURL = `${Url}model.json`;
    const metadataURL = `${Url}metadata.json`;
    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // Note: the pose library adds a tmPose object to your window (window.tmPose)
    this.setState({
      model: await tmPose.load(modelURL, metadataURL),
    });
  }

  async loop(timestamp) {
    if (this.state.session && this.state.isGaming) {
      this.state.webcam.update(); // update the webcam frame
      switch (this.state.workoutId) {
        case 1:
          await this.squatPredict();
          break;
        case 2:
          await this.pushupPredict();
          break;
        case 3:
          await this.burpeePredict();
          break;
        case 4:
          await this.lungePredict();
          break;
        default:
          break;
      }
      window.requestAnimationFrame(this.loop);
    }
  }

  countSignal() {
    this.state.session
      .signal({
        data: `${this.state.myUserName},${this.state.count}`,
        type: 'count',
      })
      .then(() => {
        this.setState({ check: false });
      });
  }

  // 스쿼트
  async squatPredict() {
    // Prediction #1: run input through posenet
    // estimatePose can take in an image, video or canvas html element
    const { pose, posenetOutput } = await this.state.model.estimatePose(this.state.webcam.canvas);
    // Prediction 2: run input through teachable machine classification model
    const prediction = await this.state.model.predict(posenetOutput);
    // 앉았을 때 check => check 상태에서 일어나면 count + 1 => 내 개수 signal
    if (prediction[1].probability.toFixed(2) > 0.99) {
      if (this.state.check) {
        this.setState({
          count: this.state.count + 1,
        });
        setTimeout(() => {
          this.countSignal();
        }, 10);
      }
    } else if (prediction[0].probability.toFixed(2) > 0.99) {
      this.setState({ check: true });
    }
  }

  // 푸쉬업
  async pushupPredict() {
    // Prediction #1: run input through posenet
    // estimatePose can take in an image, video or canvas html element
    const { pose, posenetOutput } = await this.state.model.estimatePose(this.state.webcam.canvas);
    // Prediction 2: run input through teachable machine classification model
    const prediction = await this.state.model.predict(posenetOutput);
    if (prediction[1].probability.toFixed(2) > 0.99) {
      if (this.state.check) {
        this.setState({
          count: this.state.count + 1,
        });
        setTimeout(() => {
          this.countSignal();
        }, 10);
      }
    } else if (prediction[0].probability.toFixed(2) > 0.99) {
      this.setState({ check: true });
    }
  }

  // 버피
  async burpeePredict() {
    // Prediction #1: run input through posenet
    // estimatePose can take in an image, video or canvas html element
    const { pose, posenetOutput } = await this.state.model.estimatePose(this.state.webcam.canvas);
    // Prediction 2: run input through teachable machine classification model
    const prediction = await this.state.model.predict(posenetOutput);
    if (prediction[1].probability.toFixed(2) > 0.99) {
      if (this.state.check) {
        this.setState({
          count: this.state.count + 1,
        });
        setTimeout(() => {
          this.countSignal();
        }, 10);
      }
    } else if (prediction[0].probability.toFixed(2) > 0.99) {
      this.setState({ check: true });
    }
  }

  // 런지
  async lungePredict() {
    // Prediction #1: run input through posenet
    // estimatePose can take in an image, video or canvas html element
    const { pose, posenetOutput } = await this.state.model.estimatePose(this.state.webcam.canvas);
    // Prediction 2: run input through teachable machine classification model
    const prediction = await this.state.model.predict(posenetOutput);
    if (prediction[0].probability.toFixed(2) > 0.99) {
      if (this.state.check) {
        this.setState({
          count: this.state.count + 1,
        });
        setTimeout(() => {
          this.countSignal();
        }, 10);
      }
    } else if (prediction[1].probability.toFixed(2) > 0.99) {
      this.setState({ check: true });
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
        this.props.navigate('/');
      })
      .catch(err => {
        console.log(err);
      });
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
    const {
      connectionErr,
      workoutId,
      isModelError,
      title,
      myUserName,
      isGaming,
      managerNickname,
      isPossibleStart,
      isReady,
      count,
      rankList,
    } = this.state;

    if (isModelError) {
      return <div>모델 생성 실패요</div>;
    }
    if (connectionErr) {
      return <div>올바르게 방입장했는지 확인좀요 ㅎㅎ</div>;
    }
    return (
      <Container>
        {this.state.session === undefined ? (
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
        ) : (
          // 방 제목 & 나가기 버튼 => navbar로 이동해야 함
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
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  {/* 타이머 & 시작버튼 */}
                  <TimeBox>
                    {isGaming ? (
                      <Timer></Timer>
                    ) : myUserName === managerNickname ? (
                      <SubmitBtn onClick={this.startSignal} disabled={!isPossibleStart} deactive={!isPossibleStart}>
                        시작!
                      </SubmitBtn>
                    ) : (
                      <SubmitBtn onClick={this.readySignal}>{isReady ? '취소' : '준비'}</SubmitBtn>
                    )}
                  </TimeBox>
                </Grid>

                {/* 실시간 순위 & 최종 순위 */}
                <Grid item xs={4}>
                  <Item>
                    <LiveRank rankList={rankList}></LiveRank>
                  </Item>
                </Grid>

                {/* 애니매이션 & 결과창 */}
                <Grid item xs={4}>
                  <Item>애니매이션</Item>
                </Grid>

                {/* 운동정보 및 내 횟수와 순위 */}
                <Grid item xs={4}>
                  <Item>
                    <MyWorkoutInfo count={count} workoutId={workoutId} rankList={rankList} myUserName={myUserName} />
                  </Item>
                </Grid>
              </Grid>
            </Box>

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

const Item = styledC(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const TimeBox = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

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
      {props.value <= 30 ? (
        <HurryLinearProgress variant="determinate" value={(props.value * 100) / 60} />
      ) : (
        <BorderLinearProgress variant="determinate" value={(props.value * 100) / 60} />
      )}
    </Box>
  );
}

// 내 운동정보

const MyBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MyRank = styled.div`
  display: flex;
`;
function MyWorkoutInfo({ rankList, count, workoutId, myUserName }) {
  const workoutName = function () {
    switch (workoutId) {
      case 1: {
        return '스쿼트';
      }
      case 2: {
        return '팔굽혀펴기';
      }
      case 3: {
        return '버피';
      }
      case 4: {
        return '런지';
      }
      default: {
        return '운동 정보 없음';
      }
    }
  };

  const myRank = function () {
    return rankList.findIndex(item => item.nickname === myUserName) + 1;
  };

  return (
    <MyBox>
      <p>1분 {workoutName()}!!!</p>
      <p>나의 운동 횟수 {count}개</p>
      <MyRank>
        <p>나의 순위</p> {myRank()} <p>등!</p>
      </MyRank>
    </MyBox>
  );
}

// 실시간 랭킹

const LiveBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function LiveRank({ rankList }) {
  const rankListLi = rankList.map((item, i) => {
    if (i <= 2) {
      return (
        <li key={i}>
          <FontAwesomeIcon icon={faMedal} style={{ color: 'var(--primary-color)' }} />{' '}
          <p>
            {item.nickname} {item.count}개
          </p>
        </li>
      );
    }
    return null;
  });
  return (
    <LiveBox>
      <p>실시간 랭킹 !!</p>
      <ul>{rankListLi}</ul>
    </LiveBox>
  );
}
