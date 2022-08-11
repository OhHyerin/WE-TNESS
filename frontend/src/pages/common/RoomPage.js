import React, { Component, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { OpenVidu } from 'openvidu-browser';
import axios from 'axios';
import { useSelector } from 'react-redux';
import UserVideoComponent from './UserVideoComponent';
import { getSessionInfo } from '../../features/Token';
import SubmitBtn from '../../components/common/SubmitBtn';
import './Roompage.css';

// docker run -p 4443:4443 --rm -e OPENVIDU_SECRET=WETNESS openvidu/openvidu-server-kms:2.22.0
// url :
const OPENVIDU_SERVER_URL = 'https://' + window.location.hostname + ':4443';
const OPENVIDU_SERVER_SECRET = 'WETNESS';

function RoomPage() {
  const sessionInfo = getSessionInfo();
  const nickname = useSelector(state => state.user.currentUser.nickname);

  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  if (isAuthenticated) {
    if (sessionInfo) {
      return <RoomClass sessionInfo={sessionInfo} nickname={nickname}></RoomClass>;
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
    };

    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.switchCamera = this.switchCamera.bind(this);
    this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
    this.handleChangeUserName = this.handleChangeUserName.bind(this);
    this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
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

  handleChangeSessionId(e) {
    this.setState({
      mySessionId: e.target.value,
    });
  }

  handleChangeUserName(e) {
    this.setState({
      myUserName: e.target.value,
    });
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

  leaveSession() {
    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---

    const mySession = this.state.session;

    if (mySession) {
      mySession.disconnect();
    }

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
    const { mySessionId } = this.state;
    const { myUserName } = this.state;

    return (
      <div className="container">
        {this.state.session === undefined ? (
          <div>세션정보없어용</div>
        ) : (
          <div id="session">
            <div id="session-header">
              <h1 id="session-title">{mySessionId}</h1>
              <input
                className="btn btn-large btn-danger"
                type="button"
                id="buttonLeaveSession"
                onClick={this.leaveSession}
                value="Leave session"
              />
            </div>

            {/* 내 화면 ? */}
            <div id="video-container" className="col-md-6">
              {this.state.publisher !== undefined ? (
                <div>
                  <div
                    className="stream-container col-md-6 col-xs-6"
                    onClick={() => this.handleMainVideoStream(this.state.publisher)}>
                    <UserVideoComponent streamManager={this.state.publisher} />
                  </div>
                  <SubmitBtn> 시작! </SubmitBtn>
                </div>
              ) : null}

              {/* 친구들 화면? */}
              {this.state.subscribers.map((sub, i) => (
                <div
                  key={i}
                  className="stream-container col-md-6 col-xs-6"
                  onClick={() => this.handleMainVideoStream(sub)}>
                  <UserVideoComponent streamManager={sub} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  /**
   * --------------------------
   * SERVER-SIDE RESPONSIBILITY
   * --------------------------
   * These methods retrieve the mandatory user token from OpenVidu Server.
   * This behavior MUST BE IN YOUR SERVER-SIDE IN PRODUCTION (by using
   * the API REST, openvidu-java-client or openvidu-node-client):
   *   1) Initialize a Session in OpenVidu Server	(POST /openvidu/api/sessions)
   *   2) Create a Connection in OpenVidu Server (POST /openvidu/api/sessions/<SESSION_ID>/connection)
   *   3) The Connection.token must be consumed in Session.connect() method
   */

  // getToken() {
  //   return this.createSession(this.state.mySessionId).then(sessionId => {
  //     console.log(sessionId);
  //     this.createToken(sessionId);
  //   });
  // }

  // // eslint-disable-next-line class-methods-use-this
  // createSession(sessionId) {
  //   return new Promise((resolve, reject) => {
  //     const data = JSON.stringify({ customSessionId: sessionId });
  //     axios
  //       .post(OPENVIDU_SERVER_URL + '/openvidu/api/sessions', data, {
  //         headers: {
  //           Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
  //           'Content-Type': 'application/json',
  //         },
  //       })
  //       .then(response => {
  //         console.log('CREATE SESION', response);
  //         resolve(response.data.id);
  //       })
  //       .catch(response => {
  //         const error = { ...response };
  //         if (error?.response?.status === 409) {
  //           resolve(sessionId);
  //         } else {
  //           console.log(error);
  //           console.warn('No connection to OpenVidu Server. This may be a certificate error at ' + OPENVIDU_SERVER_URL);
  //           if (
  //             window.confirm(
  //               'No connection to OpenVidu Server. This may be a certificate error at "' +
  //                 OPENVIDU_SERVER_URL +
  //                 '"\n\nClick OK to navigate and accept it. ' +
  //                 'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
  //                 OPENVIDU_SERVER_URL +
  //                 '"'
  //             )
  //           ) {
  //             window.location.assign(OPENVIDU_SERVER_URL + '/accept-certificate');
  //           }
  //         }
  //       });
  //   });
  // }

  // // eslint-disable-next-line class-methods-use-this
  // createToken(sessionId) {
  //   return new Promise((resolve, reject) => {
  //     const data = {};
  //     axios
  //       .post(OPENVIDU_SERVER_URL + '/openvidu/api/sessions/' + sessionId + '/connection', data, {
  //         headers: {
  //           Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
  //           'Content-Type': 'application/json',
  //         },
  //       })
  //       .then(response => {
  //         console.log('TOKEN', response);
  //         resolve(response.data.token);
  //       })
  //       .catch(error => reject(error));
  //   });
  // }
}

export default RoomPage;
