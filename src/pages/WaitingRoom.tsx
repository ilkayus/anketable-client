/* eslint-disable object-curly-newline */
/* eslint-disable operator-linebreak */
/* eslint-disable no-nested-ternary */
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/typedReduxHooks';
import {
  selectPollState,
  enterRoom,
  exitRoom,
  setConnected,
  setPoll,
  setUpdated,
} from '../features/poll/pollSlice';
import AnimatedPage from '../components/utils/AnimatedPage';
import DisplayShortPollInfo from '../components/WaitingRoom/DisplayShortPollInfo';
import WaitingRoomActions from '../components/WaitingRoom/WaitingRoomActions';
import Voting from '../components/WaitingRoom/Voting';
import Results from '../components/WaitingRoom/Results';
import { getConnected, getPollUpdates } from '../api/polls.gateway';

const WaitingRoom = () => {
  const dispatch = useAppDispatch();
  const { poll, connected, updated, hasVoted } =
    useAppSelector(selectPollState);
  useEffect(() => {
    dispatch(enterRoom());
    getConnected(dispatch)(setConnected);
    getPollUpdates(dispatch)(setPoll, setUpdated);
    return () => {
      dispatch(exitRoom());
    };
  }, []);

  return !(connected && updated) ? null : (
    <AnimatedPage>
      {poll?.hasStarted ?? false ? (
        hasVoted ? (
          <Results />
        ) : (
          <Voting />
        )
      ) : (
        <div className="flex flex-col w-full justify-between items-center h-full">
          <DisplayShortPollInfo
            topic={poll?.topic as string}
            id={poll?.id as string}
          />
          <WaitingRoomActions />
        </div>
      )}
    </AnimatedPage>
  );
};

export default WaitingRoom;
