/* eslint-disable no-nested-ternary */
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/typedReduxHooks';
import {
  selectPollState,
  enterRoom,
  exitRoom,
} from '../features/poll/pollSlice';
import AnimatedPage from '../components/utils/AnimatedPage';
import DisplayShortPollInfo from '../components/WaitingRoom/DisplayShortPollInfo';
import WaitingRoomActions from '../components/WaitingRoom/WaitingRoomActions';
import Voting from '../components/WaitingRoom/Voting';
import Results from '../components/WaitingRoom/Results';

const WaitingRoom = () => {
  const dispatch = useAppDispatch();
  // eslint-disable-next-line object-curly-newline
  const { poll, connected, updated, user } = useAppSelector(selectPollState);
  useEffect(() => {
    dispatch(enterRoom());
    return () => {
      dispatch(exitRoom());
    };
  }, []);
  const hasPollStarted = poll?.hasStarted ?? false;
  const hasUserVoted = poll?.rankings[user?.sub as string] !== undefined;

  return !(connected && updated) ? null : (
    <AnimatedPage>
      {hasPollStarted ? (
        hasUserVoted ? (
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
