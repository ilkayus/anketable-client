/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState } from 'react';
import { MdContentCopy } from 'react-icons/md';
import ColorizedText from '../utils/ColorizedText';
import { copyToClipboard } from '../../helpers/app.helpers';
import { selectPollState } from '../../features/poll/pollSlice';
import { useAppSelector } from '../../hooks/typedReduxHooks';
import { Headers } from '../utils/constants';

export interface Props {
  topic: string;
  id: string;
}

const DisplayShortPollInfo = ({ topic, id }: Props) => {
  const { l } = useAppSelector(selectPollState);
  const [tooltip, setTooltip] = useState('Click to copy!');

  const handleCopyClick = () => {
    void copyToClipboard(id);
    setTooltip('Copied!');
    setTimeout(() => {
      setTooltip('Click to copy!');
    }, 2000);
  };

  return (
    <div>
      <h2 className="text-center">{Headers.POLL_TOPIC[l]}</h2>
      <p className="italic text-center mb-4">{topic}</p>
      <div
        onClick={handleCopyClick}
        className="mb-4 flex flex-col justify-center align-middle cursor-pointer has-tooltip"
      >
        <span className="tooltip rounded shadow-lg p-1 bg-gray-100 text-red-500 -mt-8">
          {tooltip}
        </span>
        <h2 className="text-center">{Headers.POLL_ID[l]}</h2>
        <div className="font-extrabold mr-2 flex flex-row gap-3 text-center justify-center">
          <ColorizedText text={id} />
          <MdContentCopy size={24} />
        </div>
      </div>
    </div>
  );
};

export default DisplayShortPollInfo;
