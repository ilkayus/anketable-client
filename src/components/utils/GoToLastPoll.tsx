import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { rejoinPoll } from '../../api';
import { Poll, PollAccessTokenDecodeReturn } from '../../types/polls.types';
import { LinkButtonTitles, PageLinks } from './constants';
import LinkButton from './LinkButton';

const GoToLastPoll = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('pollAccessToken');
  const onclick = async () => {
    if (accessToken) {
      const pollInfo: PollAccessTokenDecodeReturn = jwtDecode(accessToken);
      const poll: Poll = await rejoinPoll({
        token: accessToken,
        pollID: pollInfo.pollID,
        name: pollInfo.name,
        userID: pollInfo.sub,
      });
      navigate(`/${PageLinks.WAITING_ROOM}`, { state: { poll, accessToken } });
    }
  };

  return (
    <LinkButton
      label={LinkButtonTitles.GOTO_LAST_BUTTON}
      link={PageLinks.WAITING_ROOM}
      color="green"
      handleClick={onclick}
      disabled={!accessToken}
    />
  );
};

export default GoToLastPoll;
