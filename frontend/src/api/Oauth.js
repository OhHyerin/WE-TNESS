const REST_API_KEY = "376a57e7cef85c6560a77351c93a9b1f";
const REDIRECT_URI =  'https://i7a205.p.ssafy.io/api/user/login/kakao'

const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

export default KAKAO_AUTH_URL;
