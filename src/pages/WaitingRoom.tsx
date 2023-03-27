import React from 'react';
import { useLocation } from 'react-router-dom';

const WaitingRoom = () => {
  const location = useLocation();
  console.log('passed data:', location.state);
  return <div>WaitingRoom</div>;
};

export default WaitingRoom;
