/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import { MdArrowForwardIos } from 'react-icons/md';
import { selectPollState } from '../../features/poll/pollSlice';
import { useAppSelector } from '../../hooks/typedReduxHooks';
import ColorizedText from '../utils/ColorizedText';
import { Headers, Tooltips } from '../utils/constants';
import CopyToClipboardButton from '../utils/CopyToClipboardButton';

const DisplayInfoPopup = () => {
  const { l, poll } = useAppSelector(selectPollState);
  const [isOpen, setisOpen] = useState(false);

  return (
    <div className="fixed top-[4.5rem] icon" onClick={() => setisOpen(!isOpen)}>
      <MdArrowForwardIos
        size={24}
        className={`${isOpen ? 'rotate-180' : ''} transition-all`}
      />
      <div
        className={`${
          isOpen ? ' w-[18rem] sm:w-[35rem] h-[48px]' : 'w-0 h-0'
        } overflow-scroll noScrollbar transition-all flex flex-col justify-center gap-2 ml-3 text-xs sm:text-md font-medium`}
      >
        <div className="flex flex-row gap-2">
          <span>{Headers.POLL_TOPIC[l]} </span>
          <span className="italic font-semibold">{poll?.topic}</span>
        </div>
        <div className="flex items-center gap-4">
          <span>{Headers.POLL_ID[l]} </span>
          <ColorizedText text={poll?.id as string} />
          <CopyToClipboardButton
            initialTooltip={Tooltips.COPY_CODE[l]}
            copiedTooltip={Tooltips.COPY_COPIED[l]}
            copyText={`${poll?.id as string}`}
            size={20}
          />
          <CopyToClipboardButton
            initialTooltip={Tooltips.COPY_SHARE_LINK[l]}
            copiedTooltip={Tooltips.COPY_COPIED[l]}
            copyText={`pollable.web.app/joinPoll?${poll?.id as string}`}
            size={20}
            share
          />
        </div>
      </div>
    </div>
  );
};

export default DisplayInfoPopup;
