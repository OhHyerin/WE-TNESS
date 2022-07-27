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
