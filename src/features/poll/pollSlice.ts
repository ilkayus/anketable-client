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
import * as gateway from '../../api/polls.gateway';
import { WebSocketActions } from '../../api/api.helpers';
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

export const pollSlice = createSlice({
  name: 'pollState',
  initialState,
  reducers: {
    initSocket: (state, action: PayloadAction<undefined>) => {
      gateway.getSocket();
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
      console.log('sadasdasdasd');
      state.connected = action.payload;
    },
    setUpdated: (state, action: PayloadAction<boolean>) => {
      state.updated = action.payload;
    },
    enterRoom: (state, action: PayloadAction<undefined>) => {
      console.log('asdasdasdda');
      gateway.subscribeToPoll(state.accessToken as string);
    },
    exitRoom: (state, action: PayloadAction<undefined>) => {
      gateway.unSubscribeFromPoll();
    },
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
