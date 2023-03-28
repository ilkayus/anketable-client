import axios from 'axios';
import {
  CreatePollFields,
  CreatePollReturn,
  JoinPollFields,
  JoinPollReturn,
} from '../types/polls.types';
import { urlHelper } from '../helpers/app.helpers';

const baseUrl = urlHelper.API_URL;

const createPoll = async (
  pollData: CreatePollFields,
): Promise<CreatePollReturn> => {
  const response = await axios.post(
    baseUrl + urlHelper.API_POLLS_ROUTE,
    pollData,
  );
  return response.data;
};

const joinPoll = async (
  joinPollData: JoinPollFields,
): Promise<JoinPollReturn> => {
  const response = await axios.post(
    baseUrl + urlHelper.API_JOIN_POLL,
    joinPollData,
  );
  return response.data;
};

export { createPoll, joinPoll };
