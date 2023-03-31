import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as WS from '../api/polls.gateway';
import AnimatedPage from '../components/utils/AnimatedPage';
import { Poll } from '../types/polls.types';
import DisplayShortPollInfo from '../components/WaitingRoom/DisplayShortPollInfo';
import WaitingRoomActions from '../components/WaitingRoom/WaitingRoomActions';
import ErrorPage from './ErrorPage';

const WaitingRoom = () => {
  const location = useLocation();
  if (!location.state || !location.state.poll || !location.state.accessToken)
    return <ErrorPage />;
  const [poll, setPoll] = useState<Poll>(location.state.poll);

  useEffect(() => {
    WS.subscribeToPoll(location.state.accessToken, setPoll);
    return () => WS.unSubscribeFromPoll();
  }, []);

  return (
    <AnimatedPage>
      <>
        <div className="flex flex-col w-full justify-between items-center h-full">
          <DisplayShortPollInfo topic={poll.topic} id={poll.id} />
          <WaitingRoomActions poll={poll} />
        </div>
      </>
    </AnimatedPage>
  );
};

export default WaitingRoom;
