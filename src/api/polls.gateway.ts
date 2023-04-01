import * as webSocket from './websocket';
import { WebSocketActions } from './api.helpers';
import {
  NominationDto,
  Poll,
  RemoveNominationDto,
  RemoveParticipantDto,
  SubmitRankingsDto,
} from '../types/polls.types';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

const subscribeToPoll = (
  token: string,
  cb: ActionCreatorWithPayload<Poll, 'pollState/setPoll'>,
) => {
  webSocket.createSocketConnection(token);
  getPollUpdates(cb);
};

const unSubscribeFromPoll = () => {
  webSocket.closeSocket();
};

const getSocket = (token: string) => webSocket.getSocket(token);
const isConnected = () => webSocket.isConnected();

const getPollUpdates = (
  cb: ActionCreatorWithPayload<Poll, 'pollState/setPoll'>,
) => {
  webSocket.listenSocket(WebSocketActions.POLL_UPDATE, (updatedPoll: Poll) => {
    cb(updatedPoll);
  });
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
