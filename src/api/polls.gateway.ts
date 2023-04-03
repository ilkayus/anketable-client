import * as webSocket from './websocket';
import { WebSocketActions } from './api.helpers';
import type {
  NominationDto,
  Poll,
  RemoveNominationDto,
  RemoveParticipantDto,
  SubmitRankingsDto,
} from '../types/polls.types';

import store from '../store/store';
import { setConnected, setPoll, setUpdated } from '../features/poll/pollSlice';

const getSocket = () => webSocket.getSocket();
const isConnected = () => webSocket.isConnected();

const getPollUpdates = () => {
  webSocket.listenSocket(WebSocketActions.POLL_UPDATE, (updatedPoll: Poll) => {
    // console.log('updatedPoll', updatedPoll);
    store.dispatch(setPoll(updatedPoll));
    store.dispatch(setUpdated(true));
  });
};
const getConnected = () => {
  webSocket.listenSocket(WebSocketActions.CONNECT, () => {
    store.dispatch(setConnected(true));
  });
};

const subscribeToPoll = (token: string) => {
  webSocket.createSocketConnection(token);
  getPollUpdates();
  getConnected();
};

const unSubscribeFromPoll = () => {
  webSocket.closeSocket();
};

const nominate = (data: NominationDto) => {
  webSocket.updateSocket(WebSocketActions.NOMINATE, data);
};

const removeNomination = (data: RemoveNominationDto) => {
  webSocket.updateSocket(WebSocketActions.REMOVE_NOMINATION, data);
};

const removeParticipant = (data: RemoveParticipantDto) => {
  webSocket.updateSocket(WebSocketActions.REMOVE_PARTICIPANT, data);
};

const startVote = () => {
  webSocket.updateSocket(WebSocketActions.START_VOTE);
};

const submitRankings = (data: SubmitRankingsDto) => {
  webSocket.updateSocket(WebSocketActions.SUBMIT_RANKINGS, data);
};

const closePoll = () => {
  webSocket.updateSocket(WebSocketActions.CLOSE_POLL);
};

const cancelPoll = () => {
  webSocket.updateSocket(WebSocketActions.CANCEL_POLL);
};

export {
  unSubscribeFromPoll,
  subscribeToPoll,
  getPollUpdates,
  nominate,
  removeNomination,
  removeParticipant,
  startVote,
  submitRankings,
  cancelPoll,
  closePoll,
  isConnected,
  getSocket,
};
