import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useCopyToClipboard } from 'react-use';
import * as WS from '../api/polls.gateway';
import AnimatedPage from '../components/utils/AnimatedPage';
import { Poll } from '../types/polls.types';

const WaitingRoom = () => {
  const location = useLocation();
  const [poll, setPoll] = useState<Poll>(location.state.poll);
  console.log('accessToken', location.state.accessToken, poll);

  useEffect(() => {
    WS.subscribeToPoll(location.state.accessToken, setPoll);
    return () => WS.unSubscribeFromPoll();
  }, []);

  return (
    <AnimatedPage>
      <>
        <div>WaitingRoom</div>
      </>
    </AnimatedPage>
  );
};

export default WaitingRoom;
