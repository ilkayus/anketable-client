import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store/store';
import { CreatePollFields, Poll, UserInfo } from '../../types/polls.types';
import { PageLinks } from '../../components/utils/constants';
import {
  getAccessToken,
  getPollInfoFromStorage,
  getPollInfoFromToken,
} from '../../helpers/app.helpers';
import jwtDecode from 'jwt-decode';
import * as WS from '../../api/polls.gateway';
import { WebSocketActions } from '../../api/api.helpers';
import * as API from '../../api';
import store from '../../store/store';
import { Action } from '@remix-run/router';

// type ValueOf<T> = T[keyof T];
// currentPage: (typeof PageLinks)[keyof typeof PageLinks];

type PollState = {
  socket?: any;
  poll: Poll;
  user: UserInfo;
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
  // socket: socket,
  poll: {} as Poll,
  user: {} as UserInfo,
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
// __________________________________________________________________________
export const createPoll = createAsyncThunk(
  'pollState/createPoll',
  async ({ ...params }: CreatePollFields) => {
    const pollData = await API.createPoll({ ...params });
    return pollData;
  },
);

// __________________________________________________________________________

export const pollSlice = createSlice({
  name: 'pollState',
  initialState,
  reducers: {
    hello: (state) => {
      console.log('first');
    },
    initSocket: (state, action: PayloadAction<undefined>) => {
      WS.getSocket(state.accessToken as string);
    },
    checkLastPoll: (state, action: PayloadAction<undefined>) => {
      state.user = getPollInfoFromStorage() as UserInfo;
      state.pollExists = true;
      if (!state.user?.sub) {
        state.pollExists = false;
        state.accessToken = null;
      } else state.accessToken = getAccessToken();
    },
    setPoll: (state, action: PayloadAction<Poll>) => {
      state.poll = action.payload;
    },
    setConnected: (state, action: PayloadAction<boolean>) => {
      state.connected = action.payload;
    },
    setUpdated: (state, action: PayloadAction<boolean>) => {
      state.updated = action.payload;
    },
    enterRoom: (state, action: PayloadAction<undefined>) => {
      WS.subscribeToPoll(state.accessToken as string);
    },
    exitRoom: (state, action: PayloadAction<undefined>) => {
      WS.unSubscribeFromPoll();
      state.connected = false;
      state.updated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createPoll.fulfilled, (state, action) => {
      state.poll = action.payload.poll;
      state.accessToken = action.payload.accessToken;
      state.user = getPollInfoFromToken(action.payload.accessToken) as UserInfo;
    });
  },
});

export const {
  initSocket,
  hello,
  checkLastPoll,
  enterRoom,
  setPoll,
  setConnected,
  setUpdated,
  exitRoom,
} = pollSlice.actions;
export const selectPollState = (state: RootState) => state.pollState;
export default pollSlice.reducer;
