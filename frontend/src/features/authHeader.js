import { getAccessToken } from './Token';

const headers = { Authorization: `Bearer ${getAccessToken()}` };

const config = {
  headers,
};

export default config;
