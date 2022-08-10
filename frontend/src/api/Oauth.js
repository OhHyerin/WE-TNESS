const REST_API_KEY = "29dadde0d935d3a4bda24a96faa5ed64";
const REDIRECT_URI =  'http://localhost:3000/login/kakao'

const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

export default KAKAO_AUTH_URL;