import jwtDecode from 'jwt-decode';
import type { PollAccessTokenDecodeReturn } from '../types/polls.types';

export const generateUsername = () =>
  `anon-${Math.floor(Math.random() * 1000)}`;

export const rankColor = (t?: number) => {
  switch (t) {
    case 1:
      return 'bg-green-300/50 border-green-600';
    case 2:
      return 'bg-yellow-300/50 border-yellow-600';
    case 3:
      return 'bg-orange-300/50 border-orange-600';
    case 4:
      return 'bg-red-300/50 border-red-600';
    case 5:
      return 'bg-blue-300/50 border-blue-600';
    default:
      return 'border-darkprimary-700 dark:border-gray-300';
  }
};

export const rankMeterColor = (t?: number) => {
  switch (t) {
    case 0:
      return '';
    case 1:
      return 'meterGreen';
    case 2:
      return 'meterYellow';
    case 3:
      return 'meterOrange';
    case 4:
      return 'meterRed';
    default:
      return 'meterDarkred';
  }
};

export const getAccessToken = () => localStorage.getItem('pollAccessToken');

export const removeAccessToPoll = () => {
  localStorage.removeItem('pollAccessToken');
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
