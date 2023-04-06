/* eslint-disable object-curly-newline */
/* eslint-disable operator-linebreak */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  selectPollState,
  closePoll,
  leavePoll,
  showResults,
} from '../../features/poll/pollSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/typedReduxHooks';
import ConfirmationDialog from '../utils/ConfirmationDialog';
import { LinkButtonTitles, PageLinks } from '../utils/constants';
import LinkButton from '../utils/LinkButton';
import ResultList from './ResultList';

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

  const handleShowResults = (event: any) => {
    dispatch(showResults(event.target.checked));
  };

  return (
    <>
      <div className="flex flex-col w-full justify-between h-full max-w-screen-sm">
        <div className="w-full">
          <h1 className="text-center mt-12 mb-4">Results</h1>
          {poll?.hasEnded ? (
            <ResultList poll={poll} />
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
        <div className="flex flex-col justify-center mt-4 items-center">
          {isAdmin && !poll?.hasEnded && (
            <>
              <LinkButton
                color="orange"
                label={LinkButtonTitles.END_POLL}
                handleClick={() => {
                  setIsConfirmationOpen(true);
                }}
              />
              <div className="flex flex-row gap-3 justify-center mt-6">
                <input
                  id="showResult"
                  type="checkbox"
                  onChange={handleShowResults}
                />
                <h3>Show momentry results.</h3>
              </div>
            </>
          )}
          {!isAdmin && !poll?.hasEnded && (
            <div className="my-2 italic">
              Waiting for Admin,{' '}
              <span className="font-semibold">
                {poll?.participants[poll?.adminID]}
              </span>
              , to finalize the poll.
            </div>
          )}
          {!!poll?.hasEnded && (
            <LinkButton
              color="purple"
              label={LinkButtonTitles.LEAVE_POLL}
              handleClick={() => {
                setIsLeavePollOpen(true);
              }}
            />
          )}
        </div>
        {!poll?.hasEnded && poll?.showResults ? (
          <div className="max-h-[50vh] mt-10">
            <ResultList poll={poll} />
          </div>
        ) : null}
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
