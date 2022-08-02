import { getAccessToken } from './Token';

const header = { Authorization: getAccessToken() };

const config = {
  headers: header,
};

export default config;
