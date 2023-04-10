import LinkButton from '../utils/LinkButton';
import { PageLinks, LinkButtonTitles } from '../utils/constants';
import GoToLastPoll from './GoToLastPoll';
import { selectPollState } from '../../features/poll/pollSlice';
import { useAppSelector } from '../../hooks/typedReduxHooks';

const HomepageActions = () => {
  const { l } = useAppSelector(selectPollState);
  return (
    <div className="my-12 flex flex-col">
      <LinkButton
        label={LinkButtonTitles.CREATE_POLL[l]}
        link={PageLinks.CREATE_POLL_PAGE}
        color="orange"
      />
      <LinkButton
        label={LinkButtonTitles.JOIN_POLL[l]}
        link={PageLinks.JOIN_POLL_PAGE}
        color="purple"
      />
      <GoToLastPoll />
    </div>
  );
};

export default HomepageActions;
