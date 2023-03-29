import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateUsername } from '../../helpers/app.helpers';
import { LinkButtonTitles, PageLinks } from '../utils/constants';
import InputWithLabel from '../utils/InputWithLabel';
import LinkButton from '../utils/LinkButton';
import * as API from '../../api';

const JoinPollForm = () => {
  const navigate = useNavigate();
  const [pollID, setPollID] = useState('');
  const [username, setUsername] = useState(generateUsername);
  const isUsernameValid = username.length > 1 && username.length < 25;
  const isPollIDValid = pollID.length === 6;
  const isFieldsValid = isUsernameValid && isPollIDValid;

  const handleJoinClick = async () => {
    const pollData = await API.joinPoll({
      pollID: pollID.toUpperCase(),
      name: username,
    });
    navigate(`/${PageLinks.WAITING_ROOM}`, { state: pollData });
  };

  return (
    <div className="flex flex-col w-full justify-around gap-[10vh] items-stretch h-full mx-auto">
      <div>
        <InputWithLabel
          label='Enter Code Provided by "Friend"'
          value={pollID.toUpperCase()}
          setValue={setPollID}
          placeholder="XXXXXX"
          maxLength={6}
          invalid={!isPollIDValid}
        />
        <InputWithLabel
          label="Your Name"
          value={username}
          setValue={setUsername}
          placeholder="john doe"
          invalid={!isUsernameValid}
        />
      </div>
      <div className="flex flex-col">
        <LinkButton
          label={LinkButtonTitles.JOIN_BUTTON}
          link={PageLinks.HOMEPAGE}
          color="orange"
          disabled={!isFieldsValid}
          handleClick={handleJoinClick}
        />
        <LinkButton
          label={LinkButtonTitles.START_OVER}
          link={PageLinks.HOMEPAGE}
          color="purple"
        />
      </div>
    </div>
  );
};

export default JoinPollForm;
