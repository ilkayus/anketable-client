import { useNavigate } from 'react-router-dom';
import { rejoinPoll } from '../../api';
import { getPollInfoFromToken } from '../../helpers/app.helpers';
import ErrorPage from '../../pages/ErrorPage';
import { Poll } from '../../types/polls.types';
import { LinkButtonTitles, PageLinks } from './constants';
import LinkButton from './LinkButton';

export interface Props {
  token: string | null;
}

const GoToLastPoll = ({ token }: Props) => {
  const navigate = useNavigate();

  const onclick = async () => {
    if (token) {
      const pollInfo = getPollInfoFromToken(token);
      if (!pollInfo) return <ErrorPage />;
      const poll: Poll = await rejoinPoll({
        token: token,
        pollID: pollInfo.pollID,
        name: pollInfo.name,
        userID: pollInfo.sub,
      });
      navigate(`/${PageLinks.WAITING_ROOM}`, {
        state: { poll, accessToken: token },
      });
    }
  };

  return (
    <LinkButton
      label={LinkButtonTitles.GOTO_LAST_BUTTON}
      link={PageLinks.WAITING_ROOM}
      color="green"
      handleClick={onclick}
      disabled={!token}
    />
  );
};

export default GoToLastPoll;
