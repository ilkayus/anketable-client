import * as gateway from './websocket';
import { WebSocketActions } from './api.helpers';
import {
  NominationDto,
  Poll,
  RemoveNominationDto,
  RemoveParticipantDto,
  SubmitRankingsDto,
} from '../types/polls.types';

const subscribeToPoll = (
  cb: (value: React.SetStateAction<Poll>) => void,
  setConnected: React.Dispatch<React.SetStateAction<boolean>>,
  setUpdated: React.Dispatch<React.SetStateAction<boolean>>,
  token: string,
) => {
  gateway.createSocketConnection(setConnected, token);
  getPollUpdates(cb, setUpdated);
};

const unSubscribeFromPoll = () => {
  gateway.closeSocket();
};

const getSocket = () => gateway.getSocket();
const isConnected = () => gateway.isConnected();

const getPollUpdates = (
  cb: React.Dispatch<React.SetStateAction<Poll>>,
  setUpdated: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  gateway.listenSocket(WebSocketActions.POLL_UPDATE, (updatedPoll: Poll) => {
    cb(updatedPoll);
    setUpdated(true);
  });
};

const nominate = (data: NominationDto) => {
  gateway.updateSocket(WebSocketActions.NOMINATE, data);
};

const removeNomination = (data: RemoveNominationDto) => {
  gateway.updateSocket(WebSocketActions.REMOVE_NOMINATION, data);
};

const removeParticipant = (data: RemoveParticipantDto) => {
  gateway.updateSocket(WebSocketActions.REMOVE_PARTICIPANT, data);
};

const startVote = () => {
  gateway.updateSocket(WebSocketActions.START_VOTE);
};

const submitRankings = (data: SubmitRankingsDto) => {
  gateway.updateSocket(WebSocketActions.SUBMIT_RANKINGS, data);
};

const closePoll = () => {
  gateway.updateSocket(WebSocketActions.CLOSE_POLL);
};

const cancelPoll = () => {
  gateway.updateSocket(WebSocketActions.CANCEL_POLL);
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
