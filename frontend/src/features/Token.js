import jwtDecode from 'jwt-decode';

export const setAccessToken = token => {
  window.localStorage.setItem('accessToken', token);
};
export const getAccessToken = () => {
  const token = window.localStorage.getItem('accessToken');
  return token;
};
export const removeAccessToken = () => {
  window.localStorage.removeItem('accessToken');
};

export const setRefreshToken = token => {
  window.localStorage.setItem('refreshToken', token);
};
export const getRefreshToken = () => {
  const token = window.localStorage.getItem('refreshToken');
  return token;
};
export const removeRefreshToken = () => {
  window.localStorage.removeItem('refreshToken');
};

// currentUser = {
//   nickname: ''
//   email: '',
//   role: '',
// }
export const setCurrentUser = currentUser => {
  window.localStorage.setItem('currentUser', JSON.stringify(currentUser));
};

export const getCurrentUser = () => {
  const currentUser = JSON.parse(window.localStorage.getItem('currentUser'));
  return currentUser;
};

export const removeCurrentUser = () => {
  window.localStorage.removeItem('currentUser');
};

export const decodeAccessToken = accessToken => {
  const currentUser = jwtDecode(accessToken);
  return currentUser;
};

// 세션토큰 (게임방 관련)

// function getParam(token, key) {
//   const param = token.substr(token.indexOf('?') + 1);
//   const params = param.split('&');

//   for (let i = 0; i < params.length; i++) {
//     const tmp = params[i].split('=');
//     if ([tmp[0]] == key) {
//       return tmp[1];
//     }
//   }
// }

export const setSessionInfo = info => {
  // const token = getParam(info.token, 'token');
  // const sessionId = getParam(info.token, 'sessionId');
  const sessionInfo = {
    token: info.token,
    title: info.title,
    managerNickname: info.managerNickname,
    workoutId: info.workoutId,
  };
  window.localStorage.setItem('sessionInfo', JSON.stringify(sessionInfo));
};
export const getSessionInfo = () => {
  const token = JSON.parse(window.localStorage.getItem('sessionInfo'));
  return token;
};
export const removeSessionInfo = () => {
  window.localStorage.removeItem('sessionInfo');
};
