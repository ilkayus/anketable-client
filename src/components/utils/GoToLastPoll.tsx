import { LinkButtonTitles, PageLinks } from './constants';
import LinkButton from './LinkButton';
import { useAppSelector, useAppDispatch } from '../../hooks/typedReduxHooks';
import {
  selectPollState,
  checkLastPoll,
  initSocket,
  hello,
} from '../../features/poll/pollSlice';
import { useEffect } from 'react';

const GoToLastPoll = () => {
  const dispatch = useAppDispatch();
  const { pollExists } = useAppSelector(selectPollState);
  useEffect(() => {
    // dispatch(hello());
    dispatch(checkLastPoll());
  }, []);

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
