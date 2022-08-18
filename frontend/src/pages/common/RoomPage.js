import React, { Component, useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { OpenVidu } from 'openvidu-browser';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {
  styled as styledC,
  Box,
  Paper,
  Grid,
  CircularProgress,
  Modal,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import LooksOneOutlinedIcon from '@mui/icons-material/LooksOneOutlined';
import LooksTwoOutlinedIcon from '@mui/icons-material/LooksTwoOutlined';
import Looks3OutlinedIcon from '@mui/icons-material/Looks3Outlined';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import styled from 'styled-components';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IoMicOutline, IoMicOffOutline, IoVideocamOffOutline, IoVideocamOutline } from 'react-icons/io5';
import { faMedal } from '@fortawesome/free-solid-svg-icons';
import OpenViduVideoComponent from './OvVideo';
import UserVideoComponent from './UserVideoComponent';
import { getSessionInfo } from '../../features/Token';
import SubmitBtn from '../../components/common/SubmitBtn';
import setConfig from '../../features/authHeader';
import api from '../../api';
import './RoomPage.css';

// 효과음
import squat from '../../assets/video/squat.mp4';
import pushup from '../../assets/video/pushup.mp4';
import burpee from '../../assets/video/burpee.mp4';
import lunge from '../../assets/video/lunge.mp4';
import startSound from '../../assets/sound/startSound.mp3';
import endSound from '../../assets/sound/endSound.wav';
import gameSound from '../../assets/sound/gameSound.mp3';

const gameMusic = new Audio(gameSound);

// docker run -p 4443:4443 --rm -e OPENVIDU_SECRET=WETNESS openvidu/openvidu-server-kms:2.22.0
// url :
const OPENVIDU_SERVER_URL = 'https://' + window.location.hostname + ':4443';
const OPENVIDU_SERVER_SECRET = 'WETNESS';

const Container = styled.div`
  padding: 0;
  background-color: ${props => (props.myRank === 1 ? '#fffaf0' : '#f5f5f5')};
  width: 100%;
  max-width: 100%;
  > * {
    max-width: 100%;
  }
`;

const SubContainer = styled.div`
  padding: 30px;
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const MainContainer = styled.div`
  display: flex;
  padding: 30px;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function RoomPage() {
  const navigate = useNavigate();

  const sessionInfo = getSessionInfo();
  const nickname = useSelector(state => state.user.currentUser.nickname);

  const isAuthenticated = useSelector(state => state.user.isAuthenticated);

  if (isAuthenticated) {
    if (sessionInfo) {
      return <RoomClass sessionInfo={sessionInfo} nickname={nickname} navigate={navigate} />;
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
      isRankView: false,

      audioState: true,
      videoState: true,

      isStart: false,
      countdown: 3,
      coundtDownIcon: undefined,

      isModelError: undefined,

      webcam: undefined,

      isGaming: undefined,
      isFinish: false,

      gameId: undefined,
      count: 0,
      check: undefined,

      countList: new Map(), // 유저이름, 개수 저장
      rankList: [], // 유저이름, 개수 => 1등부터 차례로 저장
    };

    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.switchCamera = this.switchCamera.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);

    // 커스텀
    this.init = this.init.bind(this);
    this.startSignal = this.startSignal.bind(this);
    this.start = this.start.bind(this);
    this.setFinish = this.setFinish.bind(this);
    this.setIsRankView = this.setIsRankView.bind(this);
    this.getMyRank = this.getMyRank.bind(this);

    // 모션 인식
    this.setModel = this.setModel.bind(this);
    this.loop = this.loop.bind(this);
    this.countSignal = this.countSignal.bind(this);
    this.squatPredict = this.squatPredict.bind(this);
    this.pushupPredict = this.pushupPredict.bind(this);
    this.burpeePredict = this.burpeePredict.bind(this);
    this.lungePredict = this.lungePredict.bind(this);
  }

  // state 업데이트 => 모델 생성 & 세션 입장 (백에서 받은 token으로 입장)
  componentDidMount() {
    window.addEventListener('beforeunload', this.onbeforeunload);
    const { sessionInfo, nickname } = this.props;
    this.setState({
      token: sessionInfo.token,
      title: sessionInfo.title,
      count: 0,
      workoutId: sessionInfo.workoutId,
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
    gameMusic.currentTime = 0;
  }

  componentWillUnmount() {
    this.leaveSession();
    window.removeEventListener('beforeunload', this.onbeforeunload);
  }

  onbeforeunload(event) {
    this.leaveSession();
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
          if (this.state.managerNickname === JSON.parse(event.stream.streamManager.stream.connection.data).nickname) {
            this.props.navigate('/');
          }
        });

        // On every asynchronous exception...
        mySession.on('exception', exception => {
          console.warn(exception);
        });

        // 시작 신호 수신
        mySession.on('signal:start', event => {
          this.setState({
            gameId: event.data,
          });
          this.start();
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
            const devices = await this.OV.getDevices();
            const videoDevices = devices.filter(device => device.kind === 'videoinput');

            // --- 5) Get your own camera stream ---

            // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
            // element: we will manage it on our own) and with the desired properties
            const publisher = this.OV.initPublisher(undefined, {
              nickname: this.state.myUserName,
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

  startSignal() {
    const mySession = this.state.session;

    const data = new Date();
    const { title } = this.state;
    const createDate = [
      data.getFullYear(),
      data.getMonth() + 1,
      data.getDate(),
      data.getHours(),
      data.getMinutes(),
      data.getSeconds(),
    ];
    const payload = {
      title,
      createDate,
    };
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
    new Audio(startSound).play();
    this.setState({
      isFinish: false,
      isStart: true,
      isGaming: false,
      count: 0,
      countList: new Map(),
      rankList: [],
      countdown: 3,
    });
    const countdown = setInterval(() => {
      if (this.state.countdown <= 0) {
        clearInterval(countdown);
      } else {
        this.setState({ countdown: this.state.countdown - 1 });
      }
    }, 1000);
    setTimeout(() => {
      gameMusic.play();
      this.setState({
        isStart: false,
        isGaming: true,
      });
      this.countSignal();
      window.requestAnimationFrame(this.loop);
    }, 3000);
  }

  // 모션 비디오
  async init() {
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
    let Url = '1';
    switch (this.state.workoutId) {
      case 1: // 스쿼트
        Url = 'https://teachablemachine.withgoogle.com/models/EGjcTW3dg/';
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
      // eslint-disable-next-line no-undef
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
      if (this.state.isFinish) {
        return;
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

  getMyRank() {
    return this.state.rankList.findIndex(item => item.nickname === this.state.myUserName) + 1;
  }

  // 게임 종료 정보 전달
  setFinish() {
    gameMusic.pause();
    new Audio(endSound).play();
    this.setState({
      isFinish: true,
      isGaming: false,
    });

    const data = new Date();
    const terminateDate = [
      data.getFullYear(),
      data.getMonth() + 1,
      data.getDate(),
      data.getHours(),
      data.getMinutes(),
      data.getSeconds(),
    ];

    const rank = this.getMyRank();
    const payload = {
      gameId: this.state.gameId,
      terminateDate,
      workoutId: this.state.workoutId,
      score: this.state.count,
      rank,
    };
    axios
      .post(api.end(), payload, setConfig())
      .then(res => {})
      .catch(err => {});
  }

  setIsRankView() {
    this.setState({
      isRankView: !this.state.isRankView,
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
    if (prediction[0].probability.toFixed(2) > 0.99) {
      if (this.state.check) {
        this.setState({
          count: this.state.count + 1,
        });
        setTimeout(() => {
          this.countSignal();
        }, 0);
      }
    } else if (prediction[1].probability.toFixed(2) > 0.99) {
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

  // 버피
  async burpeePredict() {
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
    gameMusic.pause();

    const mySession = this.state.session;
    if (mySession) {
      mySession.disconnect();
    }

    axios
      .put(
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
        this.props.navigate('/');
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
      isStart,
      countdown,
      connectionErr,
      workoutId,
      isModelError,
      isFinish,
      myUserName,
      isGaming,
      managerNickname,
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
      <Container myRank={this.getMyRank()}>
        {this.state.session === undefined ? (
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: '100px',
            }}>
            <CircularProgress />
          </Box>
        ) : (
          <div>
            {/* 카운트 다운 모달 */}
            <Modal open={isStart}>
              <Box sx={countDownStyle}>
                <CountDownIcon countdown={countdown}></CountDownIcon>
              </Box>
            </Modal>

            {/* 화면 위 쪽 UI */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '30px' }}>
              <Grid container spacing={2} sx={HeaderBoxStyle}>
                <Grid
                  item
                  xs={12}
                  sx={{ padding: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  {/* 타이머 & 시작 준비 종료 버튼 */}
                  <TimeBox>
                    {isFinish ? (
                      <SubmitBtn onClick={this.startSignal}>시작!</SubmitBtn>
                    ) : (
                      <>
                        {isGaming ? (
                          <Timer setFinish={this.setFinish} isFinish={this.state.isFinish}></Timer>
                        ) : myUserName === managerNickname ? (
                          <SubmitBtn onClick={this.startSignal}>시작!</SubmitBtn>
                        ) : (
                          <SubmitBtn deactive>{'대기 중'}</SubmitBtn>
                        )}
                      </>
                    )}
                  </TimeBox>
                </Grid>

                {/* 실시간 순위 */}
                <Grid item xs={4} sx={SubContainerStyle}>
                  {isFinish ? null : (
                    <Item sx={{ width: '100%' }}>
                      <LiveRank rankList={rankList}></LiveRank>
                    </Item>
                  )}
                  {/* 친구 화면 */}
                  <SubContainer>
                    {this.state.subscribers.map((sub, i) => {
                      if (i % 2 === 0) {
                        return (
                          <div key={i} className="stream-container">
                            <UserVideoComponent streamManager={sub} />
                          </div>
                        );
                      }
                      return null;
                    })}
                  </SubContainer>
                </Grid>

                {/* 애니메이션 & 결과창 */}
                <Grid item xs={4}>
                  <Item>
                    {isFinish ? (
                      <RankResult
                        rankList={rankList}
                        isRankView={this.state.isRankView}
                        setIsRankView={this.setIsRankView}></RankResult>
                    ) : (
                      <Animation
                        isGaming={this.state.isGaming}
                        check={this.state.check}
                        workoutId={this.state.workoutId}></Animation>
                    )}
                  </Item>

                  {/* 내 화면 */}
                  {this.state.publisher !== undefined ? (
                    <MainContainer>
                      <OpenViduVideoComponent streamManager={this.state.publisher} />
                      <MyInfoBox>
                        <Chip label={myUserName} variant="outlined" />

                        {/* 마이크 & 카메라 onOff */}
                        <MicVideoBtn>
                          <Chip
                            label={
                              this.state.audioState ? (
                                <IoMicOutline
                                  color="#009688"
                                  size="24"
                                  onClick={() => {
                                    this.state.publisher.publishAudio(!this.state.audioState);
                                    this.setState({ audioState: !this.state.audioState });
                                  }}
                                />
                              ) : (
                                <IoMicOffOutline
                                  color="#009688"
                                  size="24"
                                  onClick={() => {
                                    this.state.publisher.publishAudio(!this.state.audioState);
                                    this.setState({ audioState: !this.state.audioState });
                                  }}
                                />
                              )
                            }
                            variant="outlined"
                          />
                          <Chip
                            label={
                              this.state.videoState ? (
                                <IoVideocamOutline
                                  color="#009688"
                                  size="24"
                                  onClick={() => {
                                    this.state.publisher.publishVideo(!this.state.videoState);
                                    this.setState({ videoState: !this.state.videoState });
                                  }}
                                />
                              ) : (
                                <IoVideocamOffOutline
                                  color="#009688"
                                  size="24"
                                  onClick={() => {
                                    this.state.publisher.publishVideo(!this.state.videoState);
                                    this.setState({ videoState: !this.state.videoState });
                                  }}
                                />
                              )
                            }
                            variant="outlined"
                          />
                        </MicVideoBtn>
                      </MyInfoBox>
                    </MainContainer>
                  ) : (
                    <div></div>
                  )}
                </Grid>
                {/* 운동정보 및 내 횟수와 순위 */}
                <Grid item xs={4} sx={SubContainerStyle}>
                  <Item sx={{ width: '100%' }}>
                    <MyWorkoutInfo count={count} workoutId={workoutId} rankList={rankList} myUserName={myUserName} />
                  </Item>
                  <SubContainer>
                    {/* 친구들 화면 */}
                    {this.state.subscribers.map((sub, i) => {
                      if (i % 2) {
                        return (
                          <div key={i}>
                            <UserVideoComponent streamManager={sub} />
                          </div>
                        );
                      }
                      return null;
                    })}
                  </SubContainer>
                </Grid>
              </Grid>
            </div>

            {/* 전체 결과 모달 */}
            <Modal open={this.state.isRankView} onClose={this.setIsRankView}>
              <Box sx={isRankViewstyle}>
                <RankResult
                  rankList={rankList}
                  isRankView={this.state.isRankView}
                  setIsRankView={this.setIsRankView}></RankResult>
              </Box>
            </Modal>
          </div>
        )}
      </Container>
    );
  }
}

export default RoomPage;

const SubContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const HeaderBoxStyle = {
  flexGrow: 1,
  padding: '0px 10px',
  justifySelf: 'center',
};

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

const countDownStyle = {
  position: 'absolute',
  top: '47%',
  left: '47%',
  transform: 'translate(-30%, -30%)',
};

const countDownIconStyle = {
  color: 'white',
  fontSize: '200px',
};

const Item = styledC(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const TimeBox = styled.div`
  display: flex;
  width: 80%;
  align-items: center;
  justify-content: center;
`;

function CountDownIcon({ countdown }) {
  const viewIcon = function () {
    switch (countdown) {
      case 1:
        return <LooksOneOutlinedIcon sx={countDownIconStyle}></LooksOneOutlinedIcon>;
      case 2:
        return <LooksTwoOutlinedIcon sx={countDownIconStyle}></LooksTwoOutlinedIcon>;
      case 3:
        return <Looks3OutlinedIcon sx={countDownIconStyle}></Looks3OutlinedIcon>;
      default:
        return <h1>Go!</h1>;
    }
  };
  return <>{viewIcon()}</>;
}

// 1분 타이머
const TimerBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const TimeValue = styled.p`
  font-size: 30px;
  padding-left: 5px;
  text-align: center;
  color: ${props => (props.value <= 10 ? 'red' : 'black')};
`;

const Timer = ({ setFinish, isFinish }) => {
  const [value, setValue] = useState(30);
  const getValue = function () {
    return parseInt(value, 10);
  };
  useEffect(() => {
    if (!isFinish) {
      const myInterval = setInterval(() => {
        if (value > 0) {
          setValue(value - 0.12);
        }
        if (value <= 0) {
          setFinish();
          clearInterval(myInterval);
        }
      }, 100);
      return () => {
        clearInterval(myInterval);
      };
    }
  });

  return (
    <TimerBox>
      <div
        style={{
          alignSelf: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingBottom: '20px',
        }}>
        남은 시간<TimeValue value={value}> {getValue()}</TimeValue>
      </div>
      <div>
        <CustomizedProgressBars value={value}></CustomizedProgressBars>
      </div>
    </TimerBox>
  );
};

const HurryLinearProgress = styledC(LinearProgress)(({ theme }) => ({
  height: 20,
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
      {props.value <= 10 ? (
        <HurryLinearProgress variant="determinate" value={(props.value * 100) / 30} />
      ) : (
        <BorderLinearProgress variant="determinate" value={(props.value * 100) / 30} />
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

const WorkoutTitle = styled.div`
  padding: 10px;
`;

const MyRank = styled.div`
  display: flex;
  width: 80%;
  justify-content: space-between;
  padding: 10px;
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
      <WorkoutTitle>{workoutName()} - 30초</WorkoutTitle>
      <MyRank>
        <div>나의 운동 횟수</div>
        <div>{count}개</div>
      </MyRank>
      <MyRank>
        <div>나의 순위</div>
        <div>{myRank()}등!</div>
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
        <ListItem key={i}>
          <ListItemAvatar>
            {i === 0 ? (
              <FontAwesomeIcon icon={faMedal} size="3x" style={{ color: 'gold' }} />
            ) : i === 1 ? (
              <FontAwesomeIcon icon={faMedal} size="3x" style={{ color: 'silver' }} />
            ) : i === 2 ? (
              <FontAwesomeIcon icon={faMedal} size="3x" style={{ color: '#CD7F32' }} />
            ) : (
              <p>{i + 1}</p>
            )}
          </ListItemAvatar>
          <ListItemText primary={`${item.nickname}`} secondary={`${item.count}개`} />
        </ListItem>
      );
    }
    return null;
  });
  return (
    <LiveBox>
      <p>실시간 랭킹 !!</p>
      <List style={{ display: 'flex' }}>{rankListLi}</List>
    </LiveBox>
  );
}

// 애니매이션
const ArrowsBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const arrowStyle = {
  fontSize: '80px',
};

function Animation({ check, isGaming, workoutId }) {
  const workoutAnimation = function () {
    switch (workoutId) {
      case 1:
        return <video loop autoPlay src={squat} type="video/mp4" />;
      case 2:
        return <video loop autoPlay src={pushup} type="video/mp4" />;
      case 3:
        return <video loop autoPlay src={burpee} type="video/mp4" />;
      case 4:
        return <video loop autoPlay src={lunge} type="video/mp4" />;
      default:
        return null;
    }
  };
  return (
    <Grid container>
      {isGaming ? (
        <>
          <Grid item style={{ display: 'flex', alignItems: 'center' }} xs={8}>
            <video loop autoPlay muted style={{}}>
              <source src={squat} type="video/mp4" />
            </video>
          </Grid>
          <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'start', alignItems: 'start' }}>
            {check ? (
              <ArrowsBox className="arrows">
                <KeyboardArrowUpRoundedIcon sx={arrowStyle} className="a3" />
                <KeyboardArrowUpRoundedIcon sx={arrowStyle} className="a2" />
                <KeyboardArrowUpRoundedIcon sx={arrowStyle} className="a1" />
              </ArrowsBox>
            ) : (
              <ArrowsBox className="arrows">
                <KeyboardArrowDownRoundedIcon sx={arrowStyle} className="a1" />
                <KeyboardArrowDownRoundedIcon sx={arrowStyle} className="a2" />
                <KeyboardArrowDownRoundedIcon sx={arrowStyle} className="a3" />
              </ArrowsBox>
            )}
          </Grid>
        </>
      ) : (
        <Grid item xs={12}>
          {workoutAnimation()}
        </Grid>
      )}
    </Grid>
  );
}

// 최종 랭킹

const isRankViewstyle = {
  position: 'absolute',
  top: '20%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '1px solid var(--primary-color)',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

function RankResult({ rankList, isRankView, setIsRankView }) {
  const rankListLi = rankList.map((item, i) => {
    if (!isRankView && i > 2) {
      return null;
    }

    return (
      <ListItem key={i}>
        <ListItemAvatar>
          {i === 0 ? (
            <FontAwesomeIcon icon={faMedal} size="3x" style={{ color: 'gold' }} />
          ) : i === 1 ? (
            <FontAwesomeIcon icon={faMedal} size="3x" style={{ color: 'silver' }} />
          ) : i === 2 ? (
            <FontAwesomeIcon icon={faMedal} size="3x" style={{ color: '#CD7F32' }} />
          ) : (
            <p>{i + 1}</p>
          )}
        </ListItemAvatar>
        <ListItemText primary={`${item.nickname}`} secondary={`${item.count}개`} />
      </ListItem>
    );
  });
  return (
    <LiveBox>
      <h2>최종 순위</h2>
      {!isRankView ? <button onClick={setIsRankView}>전체 순위 보기</button> : null}
      <List style={{ display: 'flex' }}>{rankListLi}</List>
    </LiveBox>
  );
}
