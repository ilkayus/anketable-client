import jwtDecode from 'jwt-decode';
import { PollAccessTokenDecodeReturn } from '../types/polls.types';

export const generateUsername = () => {
  return `anon-${Math.floor(Math.random() * 1000)}`;
};

export const getAccessToken = () => localStorage.getItem('pollAccessToken');

export const getPollInfoFromToken = (token: string) => {
  const pollInfo: PollAccessTokenDecodeReturn = jwtDecode(token);
  return pollInfo;
};

export const getPollInfoFromStorage = () => {
  return getPollInfoFromToken(getAccessToken() as string);
};
