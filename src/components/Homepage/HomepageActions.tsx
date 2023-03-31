import LinkButton from '../utils/LinkButton';
import { PageLinks, LinkButtonTitles } from '../utils/constants';
import GoToLastPoll from '../utils/GoToLastPoll';
import { useEffect, useState } from 'react';
import { getAccessToken } from '../../helpers/app.helpers';

const HomepageActions = () => {
  const token = getAccessToken();
  return (
    <div className="my-12 flex flex-col">
      <LinkButton
        label={LinkButtonTitles.CREATE_POLL}
        link={PageLinks.CREATE_POLL_PAGE}
        color="orange"
      />
      <LinkButton
        label={LinkButtonTitles.JOIN_POLL}
        link={PageLinks.JOIN_POLL_PAGE}
        color="purple"
      />
      <GoToLastPoll token={token} />
    </div>
  );
};

export default HomepageActions;

// const useLastPollToken = () => {
//   const [token, setToken] = useState<null | string>(null);
//   useEffect(() => {
//     setToken(() => getAccessToken());
//   }, []);
//   return token;
// };
