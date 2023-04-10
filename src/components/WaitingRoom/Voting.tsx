/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmationDialog from '../utils/ConfirmationDialog';
import RankedCheckBox from './RankedCheckBox';
import { useAppDispatch, useAppSelector } from '../../hooks/typedReduxHooks';
import { leavePoll, selectPollState } from '../../features/poll/pollSlice';
import LinkButton from '../utils/LinkButton';
import {
  ConfirmationMessages,
  Headers,
  LinkButtonTitles,
  PageLinks,
  PollRoomLabels,
} from '../utils/constants';
import {
  cancelPoll,
  submitRankings,
  unSubscribeFromPoll,
} from '../../api/polls.gateway';

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
    cancelPoll();
    unSubscribeFromPoll();
    dispatch(leavePoll());
    navigate(`/${PageLinks.HOMEPAGE}`);
  };

  const handleSubmitRankings = () => {
    submitRankings({ rankings });
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-center">{Headers.VOTING_PAGE[l]}</h1>
      {poll && (
        <>
          <h3 className="text-center text-lg font-semibold mb-6">
            {PollRoomLabels.VOTING_PAGE_SUBHEADING[l]
              .replace('{0}', poll?.votesPerVoter.toString())
              .replace('{1}', nominationCount.toString())}
          </h3>
          <h3 className="text-center text-lg font-semibold mb-6 text-indigo-700 dark:text-secondary-300">
            {PollRoomLabels.VOTES_REMAINING[l].replace(
              '{0}',
              (poll.votesPerVoter - rankings.length).toString(),
            )}
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
          message={ConfirmationMessages.SUBMIT_VOTE[l]}
          confirmButtonTitle={ConfirmationMessages.CONFIRM_BUTTON[l]}
          cancelButtonTitle={ConfirmationMessages.CANCEL_BUTTON[l]}
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
              message={ConfirmationMessages.CANCEL_POLL[l]}
              confirmButtonTitle={ConfirmationMessages.CONFIRM_BUTTON[l]}
              cancelButtonTitle={ConfirmationMessages.CANCEL_BUTTON[l]}
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
