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
import { LinkButtonTitles, PageLinks } from '../utils/constants';

const Voting = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { poll, user } = useAppSelector(selectPollState);
  const [rankings, setRankings] = useState<string[]>([]);
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [confirmVotes, setConfirmVotes] = useState(false);
  const isAdmin = poll?.adminID === user?.sub;

  const toggleNomination = (id: string) => {
    const position = rankings.findIndex((ranking) => ranking === id);
    const hasVotesRemaining = (poll?.votesPerVoter ?? 0) - rankings.length > 0;

    if (position < 0 && hasVotesRemaining) {
      setRankings([...rankings, id]);
    } else {
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
    <div className="flex flex-col w-full h-full">
      <div className="w-full">
        <h1 className="text-center">Voting Page</h1>
      </div>
      <div className="w-full">
        {poll && (
          <>
            <div className="text-center text-xl font-semibold mb-6">
              Select Your Top {poll?.votesPerVoter} Choices
            </div>
            <div className="text-center text-lg font-semibold mb-6 text-indigo-700">
              {poll.votesPerVoter - rankings.length} Votes remaining
            </div>
          </>
        )}
        <div className="px-2">
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
      </div>
      <div className="my-12 flex flex-col">
        <LinkButton
          disabled={rankings.length < (poll?.votesPerVoter ?? 100)}
          color="purple"
          label={LinkButtonTitles.SUBMIT_VOTES}
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
              color="orange"
              label={LinkButtonTitles.CANCEL_POLL}
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
