import { getAccessToken } from './Token';

const header = { Authorization: `Bearer ${getAccessToken()}` };

const config = {
  headers: header,
};

export default config;
