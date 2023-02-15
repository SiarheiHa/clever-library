import { BASE_URL } from '../constants';

const getURI = (URN: string, URL: string = BASE_URL) => `${URL}${URN}`;

export { getURI };
