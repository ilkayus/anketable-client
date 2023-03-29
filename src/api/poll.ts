import { axiosInstance as axios, setBearerToken } from './axios';
import {
  CreatePollFields,
  CreatePollReturn,
  JoinPollFields,
  JoinPollReturn,
  RejoinPollFields,
  RejoinPollReturn,
} from '../types/polls.types';
import { urlHelper } from './api.helpers';

const createPoll = async (
  pollData: CreatePollFields,
): Promise<CreatePollReturn> => {
  const response = await axios.post(urlHelper.API_POLLS_ROUTE, pollData);
  setBearerToken(response.data.accessToken);
  localStorage.setItem('pollAccessToken', response.data.accessToken);
  return response.data;
};

const joinPoll = async (
  joinPollData: JoinPollFields,
): Promise<JoinPollReturn> => {
  const response = await axios.post(urlHelper.API_JOIN_POLL, joinPollData);
  setBearerToken(response.data.accessToken);
  localStorage.setItem('pollAccessToken', response.data.accessToken);
  return response.data;
};

const rejoinPoll = async (
  rejoinPollData: RejoinPollFields,
): Promise<RejoinPollReturn> => {
  setBearerToken(rejoinPollData.token);
  const response = await axios.post(urlHelper.API_REJOIN_POLL, {
    pollID: rejoinPollData.pollID,
    name: rejoinPollData.name,
    userID: rejoinPollData.userID,
  });
  return response.data;
};

export { createPoll, joinPoll, rejoinPoll };
