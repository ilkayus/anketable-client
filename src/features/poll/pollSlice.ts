import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store/store';
import {
  CreatePollFields,
  JoinPollFields,
  Poll,
  RejoinPollFields,
  UserInfo,
} from '../../types/polls.types';
import { PageLinks } from '../../components/utils/constants';
import {
  getAccessToken,
  getPollInfoFromStorage,
  getPollInfoFromToken,
  removeAccessToPoll,
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
  leavePoll: boolean;
};
const initialState: PollState = {
  // socket: socket,
  poll: undefined,
  user: undefined,
  leavePoll: false,
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
export const joinPoll = createAsyncThunk(
  'pollState/joinPoll',
  async ({ ...params }: JoinPollFields) => {
    const pollData = await API.joinPoll({ ...params });
    return pollData;
  },
);
export const rejoinPoll = createAsyncThunk(
  'pollState/rejoinPoll',
  async (_, { getState }) => {
    const state = getState() as RootState;
    const pollData = await API.rejoinPoll({
      token: state.pollState.accessToken as string,
      pollID: state.pollState.user?.pollID,
      userID: state.pollState.user?.sub,
      name: state.pollState.user?.name,
    });
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
      if (state.leavePoll) {
        removeAccessToPoll();
        state.poll = undefined;
        state.user = undefined;
        state.leavePoll = false;
      } else {
        state.user = getPollInfoFromStorage() as UserInfo;
        state.pollExists = true;
        if (!state.user?.sub) {
          state.pollExists = false;
          state.accessToken = null;
        } else state.accessToken = getAccessToken();
      }
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
    leavePoll: (state, action: PayloadAction<undefined>) => {
      // WS.removeParticipant({ id: state.user?.sub as string });
      WS.unSubscribeFromPoll();
      state.leavePoll = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPoll.fulfilled, (state, action) => {
        state.poll = action.payload.poll;
        state.accessToken = action.payload.accessToken;
        state.user = getPollInfoFromToken(
          action.payload.accessToken,
        ) as UserInfo;
      })
      .addCase(joinPoll.fulfilled, (state, action) => {
        state.poll = action.payload.poll;
        state.accessToken = action.payload.accessToken;
        state.user = getPollInfoFromToken(
          action.payload.accessToken,
        ) as UserInfo;
      })
      .addCase(rejoinPoll.fulfilled, (state, action) => {
        state.poll = action.payload;
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
  leavePoll,
} = pollSlice.actions;
export const selectPollState = (state: RootState) => state.pollState;
export default pollSlice.reducer;
