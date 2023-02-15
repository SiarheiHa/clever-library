import { BASE_URL } from '../constants';

const getURI = (URN: string, URL: string = BASE_URL) => {
  console.log(URL);
  console.log(URN);
  return `${URL}${URN}`;
};

export { getURI };
