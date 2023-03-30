import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useCopyToClipboard } from 'react-use';
import { MdContentCopy, MdPeopleOutline } from 'react-icons/md';
import { BsPencilSquare } from 'react-icons/bs';
import * as WS from '../api/polls.gateway';
import AnimatedPage from '../components/utils/AnimatedPage';
import { Poll } from '../types/polls.types';
import DisplayShortPollInfo from '../components/WaitingRoom/DisplayShortPollInfo';
import LinkButton from '../components/utils/LinkButton';
import WaitingRoomActions from '../components/WaitingRoom/WaitingRoomActions';

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
        <div className="flex flex-col w-full justify-between items-center h-full">
          <DisplayShortPollInfo topic={poll.topic} id={poll.id} />
          <WaitingRoomActions poll={poll} />
          <div className="flex flex-col justify-center"></div>
        </div>
      </>
    </AnimatedPage>
  );
};

export default WaitingRoom;
