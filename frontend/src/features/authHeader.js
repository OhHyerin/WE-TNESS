import { getAccessToken } from './Token';

const header = { 'access-token': getAccessToken() };

export default header;
