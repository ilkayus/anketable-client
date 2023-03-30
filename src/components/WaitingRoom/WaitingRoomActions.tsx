import React, { useState } from 'react';
import { BsPencilSquare } from 'react-icons/bs';
import { MdPeopleOutline } from 'react-icons/md';
import { getPollInfoFromStorage } from '../../helpers/app.helpers';
import { Nominations, Participants, Poll } from '../../types/polls.types';
import ConfirmationDialog from '../utils/ConfirmationDialog';
import { LinkButtonTitles } from '../utils/constants';
import LinkButton from '../utils/LinkButton';

export interface Props {
  poll: Poll;
}

const WaitingRoomActions = ({ poll }: Props) => {
  const [showLeaveConfirmation, setShowLeaveConfirmation] = useState(false);
  const handleParticipantsClick = () => console.log('participants');
  const handleNominationsClick = () => console.log('nominations');
  const handleStartVoteClick = () => console.log('start vote');
  const handleLeavePollClick = () => console.log('leave poll');
  const pollInfo = getPollInfoFromStorage();
  const isAdmin = poll.adminID === pollInfo.sub;
  const minimumNominations = poll.votesPerVoter < 2 ? 2 : poll.votesPerVoter;
  const canStart = Object.keys(poll.nominations).length >= minimumNominations;

  return (
    <>
      <div className="flex justify-center">
        <LinkButton
          style="box btn-orange mx-2 pulsate"
          handleClick={handleParticipantsClick}
        >
          <MdPeopleOutline size={24} />
          <span>{Object.keys(poll.participants).length}</span>
        </LinkButton>
        <LinkButton
          style="box btn-purple mx-2 pulsate"
          handleClick={handleNominationsClick}
        >
          <BsPencilSquare size={24} />
          <span>{Object.keys(poll.nominations).length}</span>
        </LinkButton>
      </div>
      <div className="flex flex-col my-4 w-full">
        {isAdmin ? (
          <>
            <div className="my-2 italic text-center">
              {minimumNominations} Nominations Required to Start!
            </div>
            <LinkButton
              color="orange"
              label={LinkButtonTitles.START_VOTING}
              disabled={!canStart}
              handleClick={handleStartVoteClick}
            />
          </>
        ) : (
          <div className="my-2 italic text-center">
            Waiting for Admin,{' '}
            <span className="font-semibold">
              {poll.participants[poll.adminID]}
            </span>
            , to start the voting.
          </div>
        )}
        <LinkButton
          color="purple"
          label={LinkButtonTitles.LEAVE_POLL}
          handleClick={() => setShowLeaveConfirmation(true)}
        />
        <ConfirmationDialog
          message="You'll be kicked out of the poll"
          showDialog={showLeaveConfirmation}
          onCancel={() => setShowLeaveConfirmation(false)}
          onConfirm={() => handleLeavePollClick()}
        />
      </div>
    </>
  );
};

export default WaitingRoomActions;
