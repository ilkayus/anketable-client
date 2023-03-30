import React from 'react';
import { BsPencilSquare } from 'react-icons/bs';
import { MdPeopleOutline } from 'react-icons/md';
import { getPollInfoFromStorage } from '../../helpers/app.helpers';
import { Nominations, Participants, Poll } from '../../types/polls.types';
import LinkButton from '../utils/LinkButton';

export interface Props {
  poll: Poll;
}

const WaitingRoomActions = ({ poll }: Props) => {
  const handleParticipantsClick = () => console.log('participants');
  const handleNominationsClick = () => console.log('nominations');
  const pollInfo = getPollInfoFromStorage();

  return (
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
  );
};

export default WaitingRoomActions;
