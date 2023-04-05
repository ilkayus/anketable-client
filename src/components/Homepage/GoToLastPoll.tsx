import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LinkButtonTitles, PageLinks } from '../utils/constants';
import LinkButton from '../utils/LinkButton';
import { useAppSelector, useAppDispatch } from '../../hooks/typedReduxHooks';
import {
  selectPollState,
  checkLastPoll,
  rejoinPoll,
} from '../../features/poll/pollSlice';

const GoToLastPoll = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pollExists } = useAppSelector(selectPollState);
  console.log('first', pollExists);
  useEffect(() => {
    dispatch(checkLastPoll());
  }, []);
  const onClick = () => {
    void dispatch(rejoinPoll());
    navigate(`/${PageLinks.WAITING_ROOM}`, { state: 'REJOIN' });
  };
  return (
    <LinkButton
      label={LinkButtonTitles.GOTO_LAST_BUTTON}
      link={PageLinks.WAITING_ROOM}
      state="REJOIN"
      color="green"
      handleClick={onClick}
      disabled={!pollExists}
    />
  );
};

export default GoToLastPoll;
