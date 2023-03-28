import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  closeSocket,
  createSocketConnection,
  listenSocket,
} from '../api/websocket';
import AnimatedPage from '../components/utils/AnimatedPage';
import { WebSocketActions } from '../helpers/app.helpers';
import { Poll } from '../types/polls.types';

const WaitingRoom = () => {
  const location = useLocation();
  const [poll, setPoll] = useState<Poll>(location.state.poll);

  useEffect(() => {
    createSocketConnection(location.state.accessToken).then(() =>
      listenSocket(WebSocketActions.POLL_UPDATE, (updatedPoll: Poll) =>
        setPoll(updatedPoll),
      ),
    );
    return () => closeSocket();
  }, []);

  useEffect(() => {
    console.log('poll updated:', poll);
  }, [poll]);

  return (
    <AnimatedPage>
      <>
        <div>WaitingRoom</div>
      </>
    </AnimatedPage>
  );
};

export default WaitingRoom;
