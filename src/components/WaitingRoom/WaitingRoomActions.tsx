import React, { useState } from 'react';
import { BsPencilSquare } from 'react-icons/bs';
import { MdPeopleOutline } from 'react-icons/md';
import { getPollInfoFromStorage } from '../../helpers/app.helpers';
import { Nominations, Participants, Poll } from '../../types/polls.types';
import ConfirmationDialog from '../utils/ConfirmationDialog';
import { LinkButtonTitles } from '../utils/constants';
import LinkButton from '../utils/LinkButton';
import NominationForm from './NominationForm';
import ParticipantList from './ParticipantList';

export interface Props {
  poll: Poll;
}

const WaitingRoomActions = ({ poll }: Props) => {
  const [showLeaveConfirmation, setShowLeaveConfirmation] = useState(false);
  const [
    showRemoveParticipantConfirmation,
    setShowRemoveParticipantConfirmation,
  ] = useState(false);
  const [showParticipantList, setShowParticipantList] = useState(false);
  const [showNominationForm, setShowNominationForm] = useState(false);
  const handleParticipantsClick = () => console.log('participants');
  const handleNominationsClick = () => console.log('nominations');
  const handleStartVoteClick = () => console.log('start vote');
  const handleLeavePollClick = () => console.log('leave poll');
  const submitRemoveParticipant = () =>
    console.log('submit remove participant');
  const handleRemoveParticipant = () => console.log('remove participant');
  const handleSubmitNomination = () => console.log('submit nomination');
  const handleRemoveNomination = () => console.log('remove nomination');
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
      <ParticipantList
        isOpen={showParticipantList}
        onClose={() => setShowParticipantList(false)}
        participants={poll.participants}
        onRemoveParticipant={handleRemoveParticipant}
        isAdmin={isAdmin}
        userID={pollInfo.sub}
      />
      <NominationForm
        title={poll.topic}
        isOpen={showNominationForm}
        onClose={() => setShowNominationForm(false)}
        onSubmitNomination={handleSubmitNomination}
        nominations={poll.nominations}
        userID={pollInfo.sub}
        onRemoveNomination={handleRemoveNomination}
        isAdmin={isAdmin}
      />
      <ConfirmationDialog
        showDialog={showRemoveParticipantConfirmation}
        message={'confirmationMessage'}
        onConfirm={() => submitRemoveParticipant()}
        onCancel={() => setShowRemoveParticipantConfirmation(false)}
      />
    </>
  );
};

export default WaitingRoomActions;
