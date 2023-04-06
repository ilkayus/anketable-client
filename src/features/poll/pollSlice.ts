/* eslint-disable operator-linebreak */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store/store';
import type {
  CreatePollFields,
  JoinPollFields,
  Poll,
  UserInfo,
} from '../../types/polls.types';
import type { PageLinks } from '../../components/utils/constants';
import * as helpers from '../../helpers/app.helpers';
import * as WS from '../../api/polls.gateway';
import * as API from '../../api';

interface PollState {
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
  minimumNominations: number;
  participantCount: number;
  hasVoted: boolean;
  rankingsCount: number;
  canVotingStart: boolean;
  leavePoll: boolean;
}
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
  minimumNominations: 2,
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
    initSocket: () => {
      WS.getSocket();
    },
    checkLastPoll: (state) => {
      if (state.leavePoll) {
        helpers.removeAccessToPoll();
        state.poll = undefined;
        state.user = undefined;
        state.leavePoll = false;
      } else {
        const lastUser = helpers.getPollInfoFromStorage() as UserInfo;
        state.user = lastUser;
        state.pollExists = true;
        if (lastUser === undefined) {
          state.pollExists = false;
          state.accessToken = null;
        } else state.accessToken = helpers.getAccessToken();
      }
    },
    setPoll: (state, action: PayloadAction<Poll>) => {
      state.poll = action.payload;
      state.isAdmin = action.payload.adminID === state.user?.sub;
      state.hasVoted =
        action.payload.rankings[state.user?.sub ?? ''] !== undefined;
      state.nominationCount = Object.keys(action.payload.nominations).length;
      state.participantCount = Object.keys(action.payload.participants).length;
      state.rankingsCount = Object.keys(action.payload.rankings).length;
      state.minimumNominations = Math.max(2, action.payload.votesPerVoter);
      state.canVotingStart =
        Object.keys(action.payload.nominations).length >=
        Math.max(2, action.payload.votesPerVoter);
    },
    setConnected: (state, action: PayloadAction<boolean>) => {
      state.connected = action.payload;
    },
    setUpdated: (state, action: PayloadAction<boolean>) => {
      state.updated = action.payload;
    },
    enterRoom: (state) => {
      WS.subscribeToPoll(state.accessToken as string);
    },
    exitRoom: (state) => {
      WS.unSubscribeFromPoll();
      state.connected = false;
      state.updated = false;
    },
    leavePoll: (state) => {
      WS.unSubscribeFromPoll();
      state.leavePoll = true;
    },
    cancelPoll: () => {
      WS.cancelPoll();
    },
    closePoll: () => {
      WS.closePoll();
    },
    showResults: (state, action: PayloadAction<boolean>) => {
      WS.showResults({ showResults: action.payload });
    },
    submitRankings: (state, action: PayloadAction<string[]>) => {
      WS.submitRankings({ rankings: action.payload });
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
        pollSlice.caseReducers.setPoll(state, {
          type: '',
          payload: action.payload.poll,
        });
        state.accessToken = action.payload.accessToken;
        state.user = helpers.getPollInfoFromToken(
          action.payload.accessToken,
        ) as UserInfo;
        state.pending = false;
      })
      .addCase(joinPoll.fulfilled, (state, action) => {
        pollSlice.caseReducers.setPoll(state, {
          type: '',
          payload: action.payload.poll,
        });
        state.accessToken = action.payload.accessToken;
        state.user = helpers.getPollInfoFromToken(
          action.payload.accessToken,
        ) as UserInfo;
        state.pending = false;
      })
      .addCase(rejoinPoll.fulfilled, (state, action) => {
        pollSlice.caseReducers.setPoll(state, {
          type: '',
          payload: action.payload,
        });
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
  cancelPoll,
  closePoll,
  showResults,
  submitRankings,
} = pollSlice.actions;
export const selectPollState = (state: RootState) => state.pollState;
export default pollSlice.reducer;
