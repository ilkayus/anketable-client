import axios from 'axios';
import { urlHelper } from '../helpers/app.helpers';

const axiosInstance = axios.create({
  baseURL: urlHelper.API_URL,
});

const setBearerToken = (token: string) => {
  axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;
};

const getBearerToken = (): string => {
  return (axiosInstance.defaults.headers.Authorization as string).split(' ')[1];
};

export { axiosInstance, setBearerToken, getBearerToken };
