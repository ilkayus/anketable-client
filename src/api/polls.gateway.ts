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
};
