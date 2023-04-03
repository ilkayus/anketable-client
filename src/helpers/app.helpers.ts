import jwtDecode from 'jwt-decode';
import type { PollAccessTokenDecodeReturn } from '../types/polls.types';

export const generateUsername = () =>
  `anon-${Math.floor(Math.random() * 1000)}`;

export const getAccessToken = () =>
  window.localStorage.getItem('pollAccessToken');

export const removeAccessToPoll = () => {
  window.localStorage.removeItem('pollAccessToken');
};

export const getPollInfoFromToken = (token: string) => {
  let pollInfo: PollAccessTokenDecodeReturn | undefined;
  try {
    pollInfo = jwtDecode(token);
  } catch {
    pollInfo = undefined;
  }
  return pollInfo;
};

export const getPollInfoFromStorage = () =>
  getPollInfoFromToken(getAccessToken() as string);

export const copyToClipboard = async (text: string) => {
  await window.navigator.clipboard.writeText(text);
};
