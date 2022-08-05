import { getAccessToken } from './Token';

function setConfig() {
  const header = { Authorization: `Bearer ${getAccessToken()}` };
  const config = {
    headers: header,
  };
  return config;
}

export default setConfig;
