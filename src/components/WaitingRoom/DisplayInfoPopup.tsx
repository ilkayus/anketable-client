/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import { MdArrowForwardIos, MdContentCopy } from 'react-icons/md';
import { selectPollState } from '../../features/poll/pollSlice';
import { copyToClipboard } from '../../helpers/app.helpers';
import { useAppSelector } from '../../hooks/typedReduxHooks';
import ColorizedText from '../utils/ColorizedText';
import { Headers } from '../utils/constants';

const DisplayInfoPopup = () => {
  const { l, poll } = useAppSelector(selectPollState);
  const [isOpen, setisOpen] = useState(false);
  const [tooltip, setTooltip] = useState('Click to copy!');

  const handleCopyClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    void copyToClipboard(poll?.id as string);
    setTooltip('Copied!');
    setTimeout(() => {
      setTooltip('Click to copy!');
    }, 2000);
  };

  return (
    <div className="fixed top-[4.5rem] icon" onClick={() => setisOpen(!isOpen)}>
      <MdArrowForwardIos
        size={24}
        className={`${isOpen ? 'rotate-180' : ''} transition-all`}
      />
      <div
        className={`${
          isOpen ? ' w-[20rem] sm:w-[35rem] h-[48px]' : 'w-0 h-0'
        } overflow-clip transition-all flex flex-col justify-center gap-2 ml-3 text-md font-medium`}
      >
        <div className="flex flex-row gap-2">
          <span>{Headers.POLL_TOPIC[l]} </span>
          <span className="italic font-semibold">{poll?.topic}</span>
        </div>
        <div
          className="flex items-center gap-2 has-tooltip cursor-pointer"
          onClick={(e) => handleCopyClick(e)}
        >
          <span className="tooltip rounded shadow-lg p-1 bg-gray-100 text-red-500 -mt-8">
            {tooltip}
          </span>
          <span>{Headers.POLL_ID[l]} </span>
          <ColorizedText text={poll?.id as string} />
          <MdContentCopy size={16} />
        </div>
      </div>
    </div>
  );
};

export default DisplayInfoPopup;
