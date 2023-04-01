import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store/store';
import { Socket } from 'socket.io-client';
import { CreatePollFields, Poll, UserInfo } from '../../types/polls.types';
import { PageLinks } from '../../components/utils/constants';
import {
  getAccessToken,
  getPollInfoFromStorage,
} from '../../helpers/app.helpers';
import jwtDecode from 'jwt-decode';
import * as gateway from '../../api/polls.gateway';
import { WebSocketActions } from '../../api/api.helpers';
import * as API from '../../api';
import { Action } from '@remix-run/router';
// import { socket } from '../../api/websocket';

// type ValueOf<T> = T[keyof T];
// currentPage: (typeof PageLinks)[keyof typeof PageLinks];

type PollState = {
  socket?: any;
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
  // socket: socket,
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
    initSocket: (state, action: PayloadAction<string>) => {
      gateway.getSocket(action.payload);
    },
    checkLastPoll: (state, action: PayloadAction<undefined>) => {
      state.user = getPollInfoFromStorage();
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
      gateway.subscribeToPoll(state.accessToken as string, setPoll);
    },
    exitRoom: (state, action: PayloadAction<undefined>) => {
      gateway.unSubscribeFromPoll();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createPoll.fulfilled, (state, action) => {
      state.poll = action.payload.poll;
      state.accessToken = action.payload.accessToken;
    });
  },
});

export const {
  initSocket,
  checkLastPoll,
  enterRoom,
  setPoll,
  setConnected,
  setUpdated,
  exitRoom,
} = pollSlice.actions;
export const selectPollState = (state: RootState) => state.pollState;
export default pollSlice.reducer;
