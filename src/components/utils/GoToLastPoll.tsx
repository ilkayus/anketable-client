import { LinkButtonTitles, PageLinks } from './constants';
import LinkButton from './LinkButton';
import { useAppSelector, useAppDispatch } from '../../hooks/typedReduxHooks';
import { selectPollState, checkLastPoll } from '../../features/poll/pollSlice';
import { useEffect } from 'react';

const GoToLastPoll = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(checkLastPoll());
  }, []);
  const { pollExists } = useAppSelector(selectPollState);

  return (
    <LinkButton
      label={LinkButtonTitles.GOTO_LAST_BUTTON}
      link={PageLinks.WAITING_ROOM}
      state={'REJOIN'}
      color="green"
      disabled={!pollExists}
    />
  );
};

export default GoToLastPoll;
