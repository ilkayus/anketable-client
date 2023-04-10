/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import { MdContentCopy, MdShare } from 'react-icons/md';
import { copyToClipboard } from '../../helpers/app.helpers';

export interface Props {
  initialTooltip: string;
  copiedTooltip: string;
  copyText: string;
  share?: boolean;
  size?: number;
}

const CopyToClipboardButton = ({
  initialTooltip,
  copiedTooltip,
  copyText,
  share = false,
  size = 24,
}: Props) => {
  const [copyTooltip, setCopyTooltip] = useState(initialTooltip);

  const handleCopyClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    void copyToClipboard(copyText);
    setCopyTooltip(copiedTooltip);
    setTimeout(() => {
      setCopyTooltip(initialTooltip);
    }, 2000);
  };
  return (
    <div
      onClick={(e) => {
        handleCopyClick(e);
      }}
      className="cursor-pointer has-tooltip"
    >
      <span className="tooltip rounded shadow-lg p-1 bg-gray-100 text-red-500 -mt-8">
        {copyTooltip}
      </span>
      {share ? <MdShare size={size} /> : <MdContentCopy size={size} />}
    </div>
  );
};

export default CopyToClipboardButton;
