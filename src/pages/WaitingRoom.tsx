import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../hooks/typedReduxHooks';
import {
  selectPollState,
  checkLastPoll,
  enterRoom,
  exitRoom,
  setPoll,
} from '../features/poll/pollSlice';
import * as gateway from '../api/polls.gateway';
import AnimatedPage from '../components/utils/AnimatedPage';
import { Poll } from '../types/polls.types';
import DisplayShortPollInfo from '../components/WaitingRoom/DisplayShortPollInfo';
import WaitingRoomActions from '../components/WaitingRoom/WaitingRoomActions';
import ErrorPage from './ErrorPage';
import Loader from '../components/utils/Loader';

const WaitingRoom = () => {
  const dispatch = useAppDispatch();
  const { poll, connected, updated, pending, accessToken } =
    useAppSelector(selectPollState);
  useEffect(() => {
    gateway.subscribeToPoll(accessToken === null ? undefined : accessToken);
    const a = dispatch(setPoll);
    gateway.getPollUpdates(a);
    return () => {
      dispatch(exitRoom());
    };
  }, []);

  return connected && updated ? (
    <Loader />
  ) : (
    <AnimatedPage>
      <>
        <div className="flex flex-col w-full justify-between items-center h-full">
          {/* <DisplayShortPollInfo topic={poll.topic} id={poll.id} />
          <WaitingRoomActions poll={poll} /> */}
        </div>
      </>
    </AnimatedPage>
  );
};

export default WaitingRoom;
