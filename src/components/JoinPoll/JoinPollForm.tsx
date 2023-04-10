import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { generateUsername } from '../../helpers/app.helpers';
import { InputLabels, LinkButtonTitles, PageLinks } from '../utils/constants';
import InputWithLabel from '../utils/InputWithLabel';
import LinkButton from '../utils/LinkButton';
import { useAppDispatch, useAppSelector } from '../../hooks/typedReduxHooks';
import { joinPoll, selectPollState } from '../../features/poll/pollSlice';

const JoinPollForm = () => {
  const dispatch = useAppDispatch();
  const { l } = useAppSelector(selectPollState);
  const navigate = useNavigate();
  const location = useLocation();
  const [pollID, setPollID] = useState('');
  const [username, setUsername] = useState(generateUsername);
  const isUsernameValid = username.length > 1 && username.length < 25;
  const isPollIDValid = pollID.length === 6;
  const isFieldsValid = isUsernameValid && isPollIDValid;

  useEffect(() => {
    if (location.search.length === 7) setPollID(location.search.slice(1));
  }, []);

  const handleJoinClick = () => {
    void dispatch(
      joinPoll({
        pollID: pollID.toUpperCase(),
        name: username,
      }),
    );
    navigate(`/${PageLinks.WAITING_ROOM}`, { state: 'JOIN' });
  };

  return (
    <div className="flex flex-col w-full justify-around gap-[10vh] items-stretch h-full mx-auto">
      <div>
        <InputWithLabel
          label={InputLabels.ROOM_CODE[l]}
          value={pollID.toUpperCase()}
          setValue={setPollID}
          placeholder={InputLabels.ROOM_CODE.placeholder[l]}
          maxLength={6}
          invalid={!isPollIDValid}
        />
        <InputWithLabel
          label={InputLabels.USERNAME[l]}
          value={username}
          setValue={setUsername}
          placeholder={InputLabels.USERNAME.placeholder[l]}
          invalid={!isUsernameValid}
        />
      </div>
      <div className="flex flex-col">
        <LinkButton
          label={LinkButtonTitles.JOIN_BUTTON[l]}
          link={PageLinks.HOMEPAGE}
          color="orange"
          disabled={!isFieldsValid}
          handleClick={handleJoinClick}
        />
        <LinkButton
          label={LinkButtonTitles.START_OVER[l]}
          link={PageLinks.HOMEPAGE}
          color="purple"
        />
      </div>
    </div>
  );
};

export default JoinPollForm;
