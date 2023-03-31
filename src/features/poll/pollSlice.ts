import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store/store';
import { Socket } from 'socket.io-client';
import { Poll, UserInfo } from '../../types/polls.types';
import { PageLinks } from '../../components/utils/constants';

// type ValueOf<T> = T[keyof T];
// currentPage: (typeof PageLinks)[keyof typeof PageLinks];

type PollState = {
  socket?: Socket;
  poll?: Poll;
  user?: UserInfo;
  accessToken?: string;
  pending: boolean;
  currentPage: keyof typeof PageLinks;
  isAdmin: boolean;
  nominationCount: number;
  participantCount: number;
  canVotingStart: boolean;
  hasVoted: boolean;
  rankingsCount: number;
};
const initialState: PollState = {
  pending: false,
  isAdmin: false,
  canVotingStart: false,
  hasVoted: false,
  nominationCount: 0,
  participantCount: 0,
  rankingsCount: 0,
  currentPage: 'HOMEPAGE',
};

export const pollSlice = createSlice({
  name: 'poll',
  initialState,
  reducers: {},
});

export const {} = pollSlice.actions;
export const selectPollState = (state: RootState) => state.poll;
export default pollSlice.reducer;
