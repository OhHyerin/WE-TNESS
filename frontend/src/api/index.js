export const API_BASE_URL = 'https://i7a205.p.ssafy.io:5000/api';

const USER_URL = '/user';
const RANK_URL = '/rank';
const ROOM_URL = '/room';
const GAME_URL = '/game';
const FITNESS_URL = '/fitness';
const NOTICE_URL = '/notice';

const LOGIN_URL = '/login';
const KAKAO_URL = '/kakao';
const ADD_INFO_URL = '/login/create-account';
const LOGOUT_URL = '/logout';
const SIGNUP_URL = '/join';
const CHECK_NICKNAME_URL = '/duplicate-nickname';
const CHECK_EMAIL_URL = '/duplicate-email';
const SEARCH_USER = '/info?keyword=';

const FETCH_FOLLOWING_LIST_URL = '/follow';
const FETCH_FOLLOWER_LIST_URL = '/follow/me';

const FETCH_USER_INFO_URL = '/me';
const CHANGE_PASSWORD = '/pw';
const FIND_PASSWORD = '/findpassword';

const MAKE_URL = '/make';
const ENTER_URL = '/enter';
const SEARCH_URL = '/search?keyword=';
const QUIT_URL = '/disconnect';

const START_URL = '/start';
const END_URL = '/end';
const FETCH_DIARY = '/diary';

const CHECK_NOTICE = '/check';

export default {
  checkNickname: nickname => API_BASE_URL + USER_URL + CHECK_NICKNAME_URL + `/${nickname}`,
  checkEditNickname: nickname => API_BASE_URL + USER_URL + LOGIN_URL + CHECK_NICKNAME_URL + `/${nickname}`,
  checkEmail: email => API_BASE_URL + USER_URL + CHECK_EMAIL_URL + `/${email}`,
  signup: () => API_BASE_URL + USER_URL + SIGNUP_URL,
  signout: () => API_BASE_URL + USER_URL,
  login: () => API_BASE_URL + USER_URL + LOGIN_URL,
  logout: () => API_BASE_URL + USER_URL + LOGOUT_URL,
  findPassword: () => API_BASE_URL + USER_URL + FIND_PASSWORD,
  kakao: () => API_BASE_URL + USER_URL + LOGIN_URL + KAKAO_URL,
  addInfo: () => API_BASE_URL + USER_URL + ADD_INFO_URL,
  fetchFollowingList: () => API_BASE_URL + FETCH_FOLLOWING_LIST_URL,
  fetchFollowerList: () => API_BASE_URL + FETCH_FOLLOWER_LIST_URL,
  fetchUserInfo: () => API_BASE_URL + USER_URL + FETCH_USER_INFO_URL,
  edit: () => API_BASE_URL + USER_URL,
  changePassword: () => API_BASE_URL + USER_URL + CHANGE_PASSWORD,
  searchUser: keyword => API_BASE_URL + USER_URL + SEARCH_USER + `${keyword}`,
  fetchHistory: nickname => API_BASE_URL + FITNESS_URL + `/${nickname}`,
  fetchRankList: () => API_BASE_URL + RANK_URL,
  fetchRoomList: () => API_BASE_URL + ROOM_URL,
  searchRooms: keyword => API_BASE_URL + ROOM_URL + SEARCH_URL + `${keyword}`,

  createRoom: () => API_BASE_URL + ROOM_URL + MAKE_URL,
  joinRoom: () => API_BASE_URL + ROOM_URL + ENTER_URL,
  quit: () => API_BASE_URL + ROOM_URL + QUIT_URL,

  start: () => API_BASE_URL + GAME_URL + START_URL,
  end: () => API_BASE_URL + GAME_URL + END_URL,
  fetchDiary: nickname => API_BASE_URL + GAME_URL + FETCH_DIARY + `/${nickname}`,

  fetchNotice: () => API_BASE_URL + NOTICE_URL,
  checkNotice: () => API_BASE_URL + NOTICE_URL + CHECK_NOTICE,
};
