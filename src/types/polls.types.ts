/* eslint-disable @typescript-eslint/consistent-type-definitions */
export type CreatePollFields = {
  topic: string;
  votesPerVoter: number;
  name: string;
};

export type JoinPollFields = {
  pollID: string;
  name: string;
};

export type RejoinPollFields = {
  token: string;
  pollID?: string;
  userID?: string;
  name?: string;
};

export type CreatePollData = {
  pollID: string;
  topic: string;
  votesPerVoter: number;
  userID: string;
};

export type AddParticipantData = {
  pollID: string;
  userID: string;
  name: string;
};

export type Participants = Record<string, string>;

export type Nomination = {
  userID: string;
  text: string;
};

type NominationID = string;

export type Nominations = Record<NominationID, Nomination>;

export type Rankings = Record<string, NominationID[]>;

export type Results = Array<{
  nominationID: NominationID;
  nominationText: string;
  score: number;
}>;

export type Poll = {
  id: string;
  topic: string;
  votesPerVoter: number;
  participants: Participants;
  adminID: string;
  nominations: Nominations;
  rankings: Rankings;
  results: Results;
  hasStarted: boolean;
};
export type AddParticipantFields = {
  pollID: string;
  userID: string;
  name: string;
};

export type AddParticipantRankingsData = {
  pollID: string;
  userID: string;
  rankings: string[];
};

export type AddNominationData = {
  pollID: string;
  nominationID: string;
  nomination: Nomination;
};

export type AddNominationFields = {
  pollID: string;
  userID: string;
  text: string;
};

export type SubmitRankingsFields = {
  pollID: string;
  userID: string;
  rankings: string[];
};

export type PollAuthPayload = {
  userID: string;
  pollID: string;
  name: string;
};

export type PollRequestWithAuth = Request & PollAuthPayload;

export type CreatePollReturn = {
  poll: Poll;
  accessToken: string;
};

export type JoinPollReturn = CreatePollReturn;
export type RejoinPollReturn = Poll;

export type PollAccessTokenDecodeReturn = {
  pollID: string;
  name: string;
  iat: number;
  exp: number;
  sub: string;
};

export type UserInfo = PollAccessTokenDecodeReturn;

export type NominationDto = {
  text: string;
};
export type RemoveNominationDto = {
  id: string;
};
export type RemoveParticipantDto = RemoveNominationDto;
export type SubmitRankingsDto = {
  rankings: string[];
};

export type WaitingRoomState = 'CREATE' | 'JOIN' | 'REJOIN';
