import jwtDecode from 'jwt-decode';
import { PollAccessTokenDecodeReturn } from '../types/polls.types';

export const generateUsername = () => {
  return `anon-${Math.floor(Math.random() * 1000)}`;
};

export const getAccessToken = () => {
  return window.localStorage.getItem('pollAccessToken');
};

export const removeAccessToPoll = () => {
  window.localStorage.removeItem('pollAccessToken');
};

export const getPollInfoFromToken = (token: string) => {
  let pollInfo: PollAccessTokenDecodeReturn | undefined = undefined;
  try {
    pollInfo = jwtDecode(token);
  } catch {
    pollInfo = undefined;
  }
  return pollInfo;
};

export const getPollInfoFromStorage = () => {
  return getPollInfoFromToken(getAccessToken() as string);
};

export const copyToClipboard = (text: string) =>
  window.navigator.clipboard.writeText(text);
