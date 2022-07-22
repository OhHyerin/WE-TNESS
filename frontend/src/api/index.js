const API_BASE_URL = ''

const LOGIN_URL = '/login'
const LOGOUT_URL = '/logout'
const SIGNUP_URL = '/join'
const CHECK_NICKNAME_URL = '/nicknamecheck'
const FETCH_FOLLOW_LIST_URL = ''

export default {
  login: () => API_BASE_URL + LOGIN_URL,
  logout: () => API_BASE_URL + LOGOUT_URL,
  signup: () => API_BASE_URL + SIGNUP_URL,
  checkNickname: nickname => API_BASE_URL + CHECK_NICKNAME_URL + `/${nickname}`,
  fetchFollowList: () => API_BASE_URL + FETCH_FOLLOW_LIST_URL
}
