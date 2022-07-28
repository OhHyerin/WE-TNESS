import jwtDecode from "jwt-decode";

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
  window.localStorage.setItem('currentUser', JSON.stringify(currentUser))
}

export const getCurrentUser = () => {
  const currentUser = JSON.parse(window.localStorage.getItem('currentUser'))
  return currentUser
}

export const removeCurrentUser = () => {
  window.localStorage.removeItem('currentUser');
}

export const decodeAccessToken = accessToken => {
  const currentUser = jwtDecode(accessToken)
  console.log(currentUser)
  return currentUser
}