export const generateUsername = () => {
  return `anon-${Math.floor(Math.random() * 1000)}`;
};

const API_URL = 'http://localhost:4000/';
const API_POLLS_ROUTE = 'polls';
const API_JOIN_POLL = 'polls/join';
const API_REJOIN_POLL = 'polls/rejoin';

export const urlHelper = {
  API_URL,
  API_POLLS_ROUTE,
  API_JOIN_POLL,
  API_REJOIN_POLL,
};
