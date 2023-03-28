import { axiosInstance as axios, setBearerToken } from './axios';
import {
  CreatePollFields,
  CreatePollReturn,
  JoinPollFields,
  JoinPollReturn,
} from '../types/polls.types';
import { urlHelper } from '../helpers/app.helpers';

const createPoll = async (
  pollData: CreatePollFields,
): Promise<CreatePollReturn> => {
  const response = await axios.post(urlHelper.API_POLLS_ROUTE, pollData);
  setBearerToken(response.data.accessToken);
  return response.data;
};

const joinPoll = async (
  joinPollData: JoinPollFields,
): Promise<JoinPollReturn> => {
  const response = await axios.post(urlHelper.API_JOIN_POLL, joinPollData);
  setBearerToken(response.data.accessToken);
  return response.data;
};

export { createPoll, joinPoll };
