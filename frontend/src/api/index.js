export const API_BASE_URL = 'http://localhost:8080'

const LOGIN_URL = '/login'
const KAKAO_URL = '/kakao'
const LOGOUT_URL = '/logout'
const SIGNUP_URL = '/join'
const EDIT_URL = ''
const CHECK_NICKNAME_URL = '/duplicatedNickname'
const FETCH_FOLLOW_LIST_URL = ''

export default {
  login: () => API_BASE_URL + LOGIN_URL,
  kakao: () => API_BASE_URL + LOGIN_URL + KAKAO_URL,
  logout: () => API_BASE_URL + LOGOUT_URL,
  signup: () => API_BASE_URL + SIGNUP_URL,
  edit: () => API_BASE_URL + EDIT_URL,
  checkNickname: nickname => API_BASE_URL + CHECK_NICKNAME_URL + `/${nickname}`,
  fetchFollowList: () => API_BASE_URL + FETCH_FOLLOW_LIST_URL
}
