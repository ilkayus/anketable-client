import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store/store';
import { Socket } from 'socket.io-client';
import { Poll, UserInfo } from '../../types/polls.types';
import { PageLinks } from '../../components/utils/constants';
import {
  getAccessToken,
  getPollInfoFromStorage,
} from '../../helpers/app.helpers';
import jwtDecode from 'jwt-decode';

// type ValueOf<T> = T[keyof T];
// currentPage: (typeof PageLinks)[keyof typeof PageLinks];

type PollState = {
  socket?: Socket;
  poll?: Poll;
  user?: UserInfo;
  accessToken: string | null;
  pending: boolean;
  updated: boolean;
  connected: boolean;
  pollExists: boolean;
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
  updated: false,
  connected: false,
  pollExists: false,
  nominationCount: 0,
  participantCount: 0,
  rankingsCount: 0,
  currentPage: 'HOMEPAGE',
  accessToken: null,
};

export const pollSlice = createSlice({
  name: 'pollState',
  initialState,
  reducers: {
    checkLastPoll: (state, action: PayloadAction<undefined>) => {
      state.user = getPollInfoFromStorage();
      state.pollExists = true;
      if (!state.user?.sub) {
        state.pollExists = false;
        state.accessToken = null;
      } else state.accessToken = getAccessToken();
    },
  },
});

export const { checkLastPoll } = pollSlice.actions;
export const selectPollState = (state: RootState) => state.pollState;
export default pollSlice.reducer;
