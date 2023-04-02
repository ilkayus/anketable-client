import LinkButton from '../utils/LinkButton';
import { PageLinks, LinkButtonTitles } from '../utils/constants';
import GoToLastPoll from './GoToLastPoll';

const HomepageActions = () => {
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
      <GoToLastPoll />
    </div>
  );
};

export default HomepageActions;
