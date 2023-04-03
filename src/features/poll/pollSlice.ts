import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store/store';
import {
  CreatePollFields,
  JoinPollFields,
  Poll,
  UserInfo,
} from '../../types/polls.types';
import { PageLinks } from '../../components/utils/constants';
import * as helpers from '../../helpers/app.helpers';
import * as WS from '../../api/polls.gateway';
import * as API from '../../api';

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
    initSocket: (state, action: PayloadAction<undefined>) => {
      WS.getSocket(state.accessToken as string);
    },
    checkLastPoll: (state, action: PayloadAction<undefined>) => {
      if (state.leavePoll) {
        helpers.removeAccessToPoll();
        state.poll = undefined;
        state.user = undefined;
        state.leavePoll = false;
      } else {
        state.user = helpers.getPollInfoFromStorage() as UserInfo;
        state.pollExists = true;
        if (!state.user?.sub) {
          state.pollExists = false;
          state.accessToken = null;
        } else state.accessToken = helpers.getAccessToken();
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
      WS.unSubscribeFromPoll();
      state.leavePoll = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPoll.pending, (state) => {
        state.pending = true;
      })
      .addCase(joinPoll.pending, (state) => {
        state.pending = true;
      })
      .addCase(rejoinPoll.pending, (state) => {
        state.pending = true;
      })
      .addCase(createPoll.fulfilled, (state, action) => {
        state.poll = action.payload.poll;
        state.accessToken = action.payload.accessToken;
        state.user = helpers.getPollInfoFromToken(
          action.payload.accessToken,
        ) as UserInfo;
        state.pending = false;
      })
      .addCase(joinPoll.fulfilled, (state, action) => {
        state.poll = action.payload.poll;
        state.accessToken = action.payload.accessToken;
        state.user = helpers.getPollInfoFromToken(
          action.payload.accessToken,
        ) as UserInfo;
        state.pending = false;
      })
      .addCase(rejoinPoll.fulfilled, (state, action) => {
        state.poll = action.payload;
        state.pending = false;
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
  leavePoll,
} = pollSlice.actions;
export const selectPollState = (state: RootState) => state.pollState;
export default pollSlice.reducer;
