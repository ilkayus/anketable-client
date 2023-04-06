/* eslint-disable object-curly-newline */
/* eslint-disable operator-linebreak */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  selectPollState,
  closePoll,
  leavePoll,
} from '../../features/poll/pollSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/typedReduxHooks';
import ConfirmationDialog from '../utils/ConfirmationDialog';
import { LinkButtonTitles, PageLinks } from '../utils/constants';
import LinkButton from '../utils/LinkButton';
import ResultCard from './ResultCard';

const Results = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { poll, participantCount, rankingsCount, isAdmin } =
    useAppSelector(selectPollState);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isLeavePollOpen, setIsLeavePollOpen] = useState(false);

  const handleLeavePoll = () => {
    dispatch(leavePoll());
    navigate(`/${PageLinks.HOMEPAGE}`);
  };

  const handleClosePoll = () => {
    dispatch(closePoll());
    setIsConfirmationOpen(false);
  };

  return (
    <>
      <div className="mx-auto flex flex-col w-full justify-between items-center h-full max-w-sm">
        <div className="w-full">
          <h1 className="text-center mt-12 mb-4">Results</h1>
          {poll?.hasEnded ? (
            <ResultCard results={poll?.results} />
          ) : (
            <p className="text-center text-xl">
              <span className="text-primary-600 dark:text-primary-300 font-extrabold">
                {rankingsCount}
              </span>{' '}
              of{' '}
              <span className="text-secondary-600 dark:text-secondary-300 font-extrabold">
                {participantCount}
              </span>{' '}
              participants have voted
            </p>
          )}
        </div>
        <div className="flex flex-col justify-center mt-4">
          {isAdmin && !poll?.results.length && (
            <LinkButton
              color="orange"
              label={LinkButtonTitles.END_POLL}
              handleClick={() => {
                setIsConfirmationOpen(true);
              }}
            />
          )}
          {!isAdmin && !poll?.results.length && (
            <div className="my-2 italic">
              Waiting for Admin,{' '}
              <span className="font-semibold">
                {poll?.participants[poll?.adminID]}
              </span>
              , to finalize the poll.
            </div>
          )}
          {!!poll?.results.length && (
            <LinkButton
              color="purple"
              label={LinkButtonTitles.LEAVE_POLL}
              handleClick={() => {
                setIsLeavePollOpen(true);
              }}
            />
          )}
        </div>
      </div>
      {isAdmin && (
        <ConfirmationDialog
          message="Are you sure close the poll and calculate the results?"
          showDialog={isConfirmationOpen}
          onCancel={() => {
            setIsConfirmationOpen(false);
          }}
          onConfirm={handleClosePoll}
        />
      )}
      {isLeavePollOpen && (
        <ConfirmationDialog
          message="You'll lose ya results. Dat alright?"
          showDialog={isLeavePollOpen}
          onCancel={() => {
            setIsLeavePollOpen(false);
          }}
          onConfirm={handleLeavePoll}
        />
      )}
    </>
  );
};

export default Results;
