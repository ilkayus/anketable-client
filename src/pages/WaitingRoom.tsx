import React from 'react';
import { useLocation } from 'react-router-dom';
import AnimatedPage from '../components/utils/AnimatedPage';

const WaitingRoom = () => {
  const location = useLocation();
  console.log('passed data:', location.state);
  return (
    <AnimatedPage>
      <>
        <div>WaitingRoom</div>
      </>
    </AnimatedPage>
  );
};

export default WaitingRoom;
