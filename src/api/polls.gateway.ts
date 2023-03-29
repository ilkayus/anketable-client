import * as gateway from './websocket';
import { WebSocketActions } from './api.helpers';
import { Poll } from '../types/polls.types';

const subscribeToPoll = (
  token: string,
  cb: (value: React.SetStateAction<Poll>) => void,
) => {
  gateway.createSocketConnection(token);
  getPollUpdates(cb);
};

const unSubscribeFromPoll = () => {
  gateway.closeSocket();
};

const getPollUpdates = (cb: (value: React.SetStateAction<Poll>) => void) => {
  gateway.listenSocket(WebSocketActions.POLL_UPDATE, (updatedPoll: Poll) =>
    cb(updatedPoll),
  );
};

const nominate = (nominationID: string) => {
  gateway.updateSocket(WebSocketActions.NOMINATE, nominationID);
};

const removeNomination = (participantID: string) => {
  gateway.updateSocket(WebSocketActions.REMOVE_NOMINATION, participantID);
};

const removeParticipant = (nominationID: string) => {
  gateway.updateSocket(WebSocketActions.REMOVE_PARTICIPANT, nominationID);
};

const startVote = () => {
  gateway.updateSocket(WebSocketActions.START_VOTE);
};

const submitRankings = (rankings: string[]) => {
  gateway.updateSocket(WebSocketActions.SUBMIT_RANKINGS, rankings);
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
};
