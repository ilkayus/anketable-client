/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import ColorizedText from '../utils/ColorizedText';
import { selectPollState } from '../../features/poll/pollSlice';
import { useAppSelector } from '../../hooks/typedReduxHooks';
import { Headers, Tooltips } from '../utils/constants';
import CopyToClipboardButton from '../utils/CopyToClipboardButton';

export interface Props {
  topic: string;
  id: string;
}

const DisplayShortPollInfo = ({ topic, id }: Props) => {
  const { l } = useAppSelector(selectPollState);

  return (
    <div>
      <h2 className="text-center">{Headers.POLL_TOPIC[l]}</h2>
      <p className="italic text-center mb-4">{topic}</p>
      <div className="mb-4 flex flex-col justify-center align-middle">
        <h2 className="text-center">{Headers.POLL_ID[l]}</h2>
        <div className="font-extrabold mr-2 flex flex-row gap-3 text-center justify-center">
          <ColorizedText text={id} />
          <CopyToClipboardButton
            initialTooltip={Tooltips.COPY_CODE[l]}
            copiedTooltip={Tooltips.COPY_COPIED[l]}
            copyText={id}
          />
          <CopyToClipboardButton
            initialTooltip={Tooltips.COPY_SHARE_LINK[l]}
            copiedTooltip={Tooltips.COPY_COPIED[l]}
            copyText={`pollable.web.app/joinPoll?${id}`}
            share
          />
        </div>
      </div>
    </div>
  );
};

export default DisplayShortPollInfo;
