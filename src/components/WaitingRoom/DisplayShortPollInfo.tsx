import { MdContentCopy } from 'react-icons/md';
import ColorizedText from '../utils/ColorizedText';
import { useState } from 'react';
import { copyToClipboard } from '../../helpers/app.helpers';

export interface Props {
  topic: string;
  id: string;
}

const DisplayShortPollInfo = ({ topic, id }: Props) => {
  const [tooltip, setTooltip] = useState('Click to copy!');

  const handleCopyClick = () => {
    copyToClipboard(id);
    setTooltip('Copied!');
    setTimeout(() => setTooltip('Click to copy!'), 2000);
  };

  return (
    <div>
      <h2 className="text-center">Poll Topic</h2>
      <p className="italic text-center mb-4">{topic}</p>
      <div
        onClick={handleCopyClick}
        className="mb-4 flex flex-col justify-center align-middle cursor-pointer has-tooltip"
      >
        <span className="tooltip rounded shadow-lg p-1 bg-gray-100 text-red-500 -mt-8">
          {tooltip}
        </span>
        <h2 className="text-center">Poll ID</h2>
        <div className="font-extrabold text-center mr-2 flex flex-row gap-3">
          <ColorizedText text={id} />
          <MdContentCopy size={24} />
        </div>
      </div>
    </div>
  );
};

export default DisplayShortPollInfo;
