/* eslint-disable function-paren-newline */
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
import { replaceJSX } from '../../helpers/app.helpers';
import { useAppDispatch, useAppSelector } from '../../hooks/typedReduxHooks';
import ConfirmationDialog from '../utils/ConfirmationDialog';
import {
  ConfirmationMessages,
  Headers,
  LinkButtonTitles,
  PageLinks,
  PollRoomLabels,
} from '../utils/constants';
import LinkButton from '../utils/LinkButton';
import ResultList from './ResultList';

const Results = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { poll, participantCount, rankingsCount, isAdmin, l } =
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
          <h1 className="text-center mt-12 mb-4">{Headers.RESULTS_PAGE[l]}</h1>
          {poll?.hasEnded ? (
            <ResultList poll={poll} />
          ) : (
            <p className="text-center text-xl">
              {replaceJSX(
                PollRoomLabels.RESULTS_PAGE_SUBHEADING[l],
                '{0}',
                <span className="text-primary-600 dark:text-primary-300 font-extrabold">
                  {rankingsCount}
                </span>,
              ).map((el) =>
                replaceJSX(
                  el,
                  '{1}',
                  <span className="text-secondary-600 dark:text-secondary-300 font-extrabold">
                    {participantCount}
                  </span>,
                ),
              )}
            </p>
          )}
        </div>
        <div className="flex flex-col justify-center mt-4 items-center">
          {isAdmin && !poll?.hasEnded && (
            <>
              <LinkButton
                color="orange"
                label={LinkButtonTitles.END_POLL[l]}
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
                <h3>{PollRoomLabels.SHOW_RESULTS_CHECKBOX[l]}</h3>
              </div>
            </>
          )}
          {!isAdmin && !poll?.hasEnded && (
            <div className="my-2 italic">
              {replaceJSX(
                PollRoomLabels.WAITING_POLL_END_MESSAGE[l],
                '{0}',
                <span className="font-semibold">
                  {poll?.participants[poll?.adminID]}
                </span>,
              )}
            </div>
          )}
          {!!poll?.hasEnded && (
            <LinkButton
              color="purple"
              label={LinkButtonTitles.LEAVE_POLL[l]}
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
          message={ConfirmationMessages.END_POLL[l]}
          confirmButtonTitle={ConfirmationMessages.CONFIRM_BUTTON[l]}
          cancelButtonTitle={ConfirmationMessages.CANCEL_BUTTON[l]}
          showDialog={isConfirmationOpen}
          onCancel={() => {
            setIsConfirmationOpen(false);
          }}
          onConfirm={handleClosePoll}
        />
      )}
      {isLeavePollOpen && (
        <ConfirmationDialog
          message={ConfirmationMessages.LEAVE_POLL[l]}
          confirmButtonTitle={ConfirmationMessages.CONFIRM_BUTTON[l]}
          cancelButtonTitle={ConfirmationMessages.CANCEL_BUTTON[l]}
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
