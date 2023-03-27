import axios from 'axios';
import { CreatePollFields, CreatePollReturn } from '../types/polls.types';

const baseUrl = 'http://localhost:4000/polls';

const createPoll = async (
  pollData: CreatePollFields,
): Promise<CreatePollReturn> => {
  const response = await axios.post(baseUrl, pollData);
  return response.data;
};

export { createPoll };
