/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmationDialog from '../utils/ConfirmationDialog';
import RankedCheckBox from './RankedCheckBox';
import { useAppDispatch, useAppSelector } from '../../hooks/typedReduxHooks';
import {
  cancelPoll,
  leavePoll,
  selectPollState,
  submitRankings,
} from '../../features/poll/pollSlice';
import LinkButton from '../utils/LinkButton';
import {
  Headers,
  LinkButtonTitles,
  PageLinks,
  PollRoomLabels,
} from '../utils/constants';

const Voting = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { poll, isAdmin, nominationCount, l } = useAppSelector(selectPollState);
  const [rankings, setRankings] = useState<string[]>([]);
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [confirmVotes, setConfirmVotes] = useState(false);

  const toggleNomination = (id: string) => {
    const position = rankings.findIndex((ranking) => ranking === id);
    const hasVotesRemaining = (poll?.votesPerVoter ?? 0) - rankings.length > 0;
    if (position < 0 && hasVotesRemaining) {
      setRankings([...rankings, id]);
    } else if (position > -1) {
      setRankings([
        ...rankings.slice(0, position),
        ...rankings.slice(position + 1, rankings.length),
      ]);
    }
  };

  const getRank = (id: string) => {
    const position = rankings.findIndex((ranking) => ranking === id);
    return position < 0 ? undefined : position + 1;
  };

  const handleCancelPoll = () => {
    dispatch(cancelPoll());
    dispatch(leavePoll());
    navigate(`/${PageLinks.HOMEPAGE}`);
  };

  const handleSubmitRankings = () => {
    dispatch(submitRankings(rankings));
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-center">{Headers.VOTING_PAGE[l]}</h1>
      {poll && (
        <>
          <h3 className="text-center text-lg font-semibold mb-6">
            Select Your Top {poll?.votesPerVoter}{' '}
            {poll?.votesPerVoter > 1 ? 'Choices' : 'Choice'} in{' '}
            {nominationCount} nominated
          </h3>
          <h3 className="text-center text-lg font-semibold mb-6 text-indigo-700 dark:text-secondary-300">
            {PollRoomLabels.VOTES_REMAINING[l]}{' '}
            {poll.votesPerVoter - rankings.length}
          </h3>
        </>
      )}
      <hr />
      <div className="px-2 max-h-[50vh] overflow-x-hidden overflow-y-scroll noScrollbar ">
        {Object.entries(poll?.nominations ?? {}).map(([id, nomination]) => (
          <RankedCheckBox
            key={id}
            value={nomination.text}
            rank={getRank(id)}
            onSelect={() => {
              toggleNomination(id);
            }}
          />
        ))}
      </div>
      <hr />
      <div className="my-12 flex flex-col">
        <LinkButton
          disabled={rankings.length < (poll?.votesPerVoter ?? 100)}
          color="green"
          label={LinkButtonTitles.SUBMIT_VOTES[l]}
          handleClick={() => {
            setConfirmVotes(true);
          }}
        />
        <ConfirmationDialog
          message="You cannot change your vote after submitting"
          showDialog={confirmVotes}
          onCancel={() => {
            setConfirmVotes(false);
          }}
          onConfirm={handleSubmitRankings}
        />
        {isAdmin && (
          <>
            <LinkButton
              color="red"
              label={LinkButtonTitles.CANCEL_POLL[l]}
              handleClick={() => {
                setConfirmCancel(true);
              }}
            />
            <ConfirmationDialog
              message="This will cancel the poll and remove all users"
              showDialog={confirmCancel}
              onCancel={() => {
                setConfirmCancel(false);
              }}
              onConfirm={handleCancelPoll}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Voting;
