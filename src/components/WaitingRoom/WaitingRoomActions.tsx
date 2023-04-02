import { useEffect, useState } from 'react';
import { BsPencilSquare } from 'react-icons/bs';
import { MdPeopleOutline } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import * as WS from '../../api/polls.gateway';
import { selectPollState } from '../../features/poll/pollSlice';
import { removeAccessToPoll } from '../../helpers/app.helpers';
import { useAppSelector } from '../../hooks/typedReduxHooks';
import { Poll } from '../../types/polls.types';
import ConfirmationDialog from '../utils/ConfirmationDialog';
import { LinkButtonTitles, PageLinks } from '../utils/constants';
import LinkButton from '../utils/LinkButton';
import NominationForm from './NominationForm';
import ParticipantList from './ParticipantList';

const WaitingRoomActions = () => {
  const navigate = useNavigate();
  const { poll, user } = useAppSelector(selectPollState);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [showLeaveConfirmation, setShowLeaveConfirmation] = useState(false);
  const [showConfirmationMessage, setShowConfirmationMessage] = useState(false);
  const [participantToRemove, setParticipantToRemove] = useState('');
  const [showParticipantList, setShowParticipantList] = useState(false);
  const [showNominationForm, setShowNominationForm] = useState(false);

  const handleParticipantsClick = () => setShowParticipantList(true);

  const handleNominationsClick = () => setShowNominationForm(true);

  const handleStartVoteClick = () => WS.startVote();

  const handleLeavePollClick = () => {
    WS.removeParticipant({ id: user.sub });
    navigate(`/${PageLinks.HOMEPAGE}`);
    removeAccessToPoll();
  };

  const submitRemoveParticipant = () => {
    participantToRemove && WS.removeParticipant({ id: participantToRemove });
    setShowConfirmationMessage(false);
  };

  const handleRemoveParticipant = (id: string) => {
    setConfirmationMessage(`Remove ${poll.participants[id]} from poll?`);
    setParticipantToRemove(id);
    setShowConfirmationMessage(true);
  };

  const handleSubmitNomination = (nomination: string) =>
    WS.nominate({ text: nomination });

  const handleRemoveNomination = (nominationID: string) =>
    WS.removeNomination({ id: nominationID });

  const minimumNominations = poll.votesPerVoter < 2 ? 2 : poll.votesPerVoter;
  const canStart = Object.keys(poll.nominations).length >= minimumNominations;

  const isAdmin = poll.adminID === user.sub;

  useEffect(() => {
    if (!poll.participants[user.sub]) {
      navigate(`/${PageLinks.HOMEPAGE}`);
    }
  }, [poll.participants]);

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
        userID={user.sub}
      />
      <NominationForm
        title={poll.topic}
        isOpen={showNominationForm}
        onClose={() => setShowNominationForm(false)}
        onSubmitNomination={handleSubmitNomination}
        nominations={poll.nominations}
        userID={user.sub}
        onRemoveNomination={handleRemoveNomination}
        isAdmin={isAdmin}
      />
      <ConfirmationDialog
        showDialog={showConfirmationMessage}
        message={confirmationMessage}
        onConfirm={() => submitRemoveParticipant()}
        onCancel={() => setShowConfirmationMessage(false)}
      />
    </>
  );
};

export default WaitingRoomActions;
