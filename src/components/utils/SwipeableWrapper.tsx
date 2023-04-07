/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';

export interface Props {
  children: JSX.Element | JSX.Element[];
  handler: (n: number) => void;
  value: number;
}

const SwipeableWrapper = ({ children, value, handler }: Props) => {
  const handleSwipe = (dir: number, td: number) => {
    if (td > 200 && td < 2000) {
      if (dir > 150) handler(value === 3 ? 0 : value + 1);
      if (dir < -150) handler(value === 0 ? 3 : value - 1);
    }
  };

  let downPoint = 0;
  let downTimestamp = 0;

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    downTimestamp = e.timeStamp;
    downPoint = e.clientX;
  };
  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const direction = e.clientX - downPoint;
    const timeDiff = e.timeStamp - downTimestamp;
    handleSwipe(direction, timeDiff);
  };

  const handleTouchDown = (e: React.TouchEvent<HTMLDivElement>) => {
    downTimestamp = e.timeStamp;
    downPoint = e.changedTouches[0].clientX;
  };
  const handleTouchUp = (e: React.TouchEvent<HTMLDivElement>) => {
    const direction = e.changedTouches[0].clientX - downPoint;
    const timeDiff = e.timeStamp - downTimestamp;
    handleSwipe(direction, timeDiff);
  };
  return (
    <div
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchDown}
      onMouseUp={handleMouseUp}
      onTouchEnd={handleTouchUp}
      className="select-none"
    >
      {children}
    </div>
  );
};

export default SwipeableWrapper;
