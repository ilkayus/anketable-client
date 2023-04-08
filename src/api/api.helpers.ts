// const API_URL = 'http://192.168.1.143:4000/';
// const WS_BASE_URL = '192.168.1.143';

const WS_BASE_URL = 'https://anketable-server.onrender.com';

const API_URL = 'https://anketable-server.onrender.com/';
const API_POLLS_ROUTE = 'polls';
const API_JOIN_POLL = 'polls/join';
const API_REJOIN_POLL = 'polls/rejoin';

export const urlHelper = {
  API_URL,
  API_POLLS_ROUTE,
  API_JOIN_POLL,
  API_REJOIN_POLL,
};

// const WS_BASE_URL = '127.0.0.1';
const WS_PORT = '4000';
const WS_NAMESPACE = 'polls';
// const WS_URL = `http://${WS_BASE_URL}:${WS_PORT}/${WS_NAMESPACE}`;
const WS_URL = `${WS_BASE_URL}/${WS_NAMESPACE}`;

export const webSocketHelper = {
  WS_BASE_URL,
  WS_PORT,
  WS_NAMESPACE,
  WS_URL,
};

export enum WebSocketActions {
  CONNECTED = 'connected',
  ERROR = 'connect_error',
  CONNECT = 'connect',
  POLL_UPDATE = 'poll_updated',
  REMOVE_PARTICIPANT = 'remove_participant',
  NOMINATE = 'nominate',
  REMOVE_NOMINATION = 'remove_nomination',
  START_VOTE = 'start_vote',
  SUBMIT_RANKINGS = 'submit_rankings',
  CLOSE_POLL = 'close_poll',
  CANCEL_POLL = 'cancel_poll',
  SHOW_RESULTS = 'show_results',
}
