export const API_BASE_URL = 'http://localhost:3000'

const LOGIN_URL = '/login'
const LOGOUT_URL = '/logout'
const SIGNUP_URL = '/join'
const CHECK_NICKNAME_URL = '/nicknamecheck'

export default {
  login: () => API_BASE_URL + LOGIN_URL,
  logout: () => API_BASE_URL + LOGOUT_URL,
  signup: () => API_BASE_URL + SIGNUP_URL,
  checkNickname: nickname => API_BASE_URL + CHECK_NICKNAME_URL + `/${nickname}`
}
