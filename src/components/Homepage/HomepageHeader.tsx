import { selectPollState } from '../../features/poll/pollSlice';
import { useAppSelector } from '../../hooks/typedReduxHooks';
import { Headers } from '../utils/constants';

const HomepageHeader = () => {
  const { l } = useAppSelector(selectPollState);
  return <h1 className="text-center my-12">{Headers.HOMEPAGE[l]}</h1>;
};

export default HomepageHeader;
