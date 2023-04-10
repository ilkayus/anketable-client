/* eslint-disable object-curly-newline */
/* eslint-disable operator-linebreak */
/* eslint-disable no-nested-ternary */
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/typedReduxHooks';
import {
  selectPollState,
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
import {
  getConnected,
  getPollUpdates,
  subscribeToPoll,
  unSubscribeFromPoll,
} from '../api/polls.gateway';
import DisplayInfoPopup from '../components/WaitingRoom/DisplayInfoPopup';

const WaitingRoom = () => {
  const dispatch = useAppDispatch();
  const { poll, connected, updated, hasVoted, accessToken } =
    useAppSelector(selectPollState);

  useEffect(() => {
    subscribeToPoll(accessToken);
    getConnected(dispatch)(setConnected);
    getPollUpdates(dispatch)(setPoll, setUpdated);
    return () => {
      unSubscribeFromPoll();
      dispatch(exitRoom());
    };
  }, []);

  return !(connected && updated) ? null : (
    <AnimatedPage>
      {poll?.hasStarted ?? false ? (
        <>
          <DisplayInfoPopup />
          {(poll?.hasEnded ?? false) || hasVoted ? <Results /> : <Voting />}
        </>
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
