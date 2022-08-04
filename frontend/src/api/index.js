export const API_BASE_URL = 'http://localhost:8080';

const USER_URL = '/user';
const RANK_URL = '/rank'

const LOGIN_URL = '/login';
const KAKAO_URL = '/kakao';
const ADD_INFO_URL = '/login/create-account';
const LOGOUT_URL = '/logout';
const SIGNUP_URL = '/join';
const CHECK_NICKNAME_URL = '/duplicate-nickname';
const CHECK_EMAIL_URL = '/duplicate-email';

const FETCH_FOLLOW_LIST_URL = '';
const FETCH_USER_INFO_URL = '/me';
const CHANGE_PASSWORD = '';
const FIND_PASSWORD = '/findpassword';

const HISTORY_URL = '';

export default {
  checkNickname: nickname => API_BASE_URL + USER_URL + CHECK_NICKNAME_URL + `/${nickname}`,
  checkEmail: email => API_BASE_URL + USER_URL + CHECK_EMAIL_URL + `/${email}`,
  signup: () => API_BASE_URL + USER_URL + SIGNUP_URL,
  login: () => API_BASE_URL + USER_URL + LOGIN_URL,
  logout: () => API_BASE_URL + USER_URL + LOGOUT_URL,
  findPassword: () => API_BASE_URL + USER_URL + FIND_PASSWORD,
  kakao: () => API_BASE_URL + USER_URL + LOGIN_URL + KAKAO_URL,
  addInfo: () => API_BASE_URL + USER_URL + ADD_INFO_URL,
  fetchFollowList: () => API_BASE_URL + FETCH_FOLLOW_LIST_URL,
  fetchUserInfo: () => API_BASE_URL + USER_URL + FETCH_USER_INFO_URL,
  edit: () => API_BASE_URL + USER_URL,
  changePassword: () => API_BASE_URL + CHANGE_PASSWORD,
  fetchHistory: nickname => API_BASE_URL + USER_URL + HISTORY_URL + `/${nickname}`,
  fetchRankList: () => API_BASE_URL + RANK_URL
};
