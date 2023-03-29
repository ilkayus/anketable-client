import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { LinkButtonTitles, PageLinks } from './constants';
import LinkButton from './LinkButton';

const GoToLastPoll = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('pollAccessToken');
  const onclick = () => {
    const pollInfo = jwtDecode(accessToken as string);
  };

  return (
    <LinkButton
      label={LinkButtonTitles.JOIN_POLL}
      link={PageLinks.JOIN_POLL_PAGE}
      color="green"
      handleClick={onclick}
      disabled={!accessToken}
    />
  );
};

export default GoToLastPoll;
