import { selectPollState } from '../../features/poll/pollSlice';
import { useAppSelector } from '../../hooks/typedReduxHooks';
import { PollRoomLabels } from '../utils/constants';

const ResultCardHeader = () => {
  const { l } = useAppSelector(selectPollState);
  return (
    <div className="grid grid-cols-3 gap-4 pb-2 my-2 border-b-2 border-solid border-purple-70 pr-4">
      <div className="col-span-2 font-semibold">
        {PollRoomLabels.CANDIDATE[l]}
      </div>
      <div className="col-span-1 font-semibold text-right">
        {PollRoomLabels.SCORE[l]}
      </div>
    </div>
  );
};

export default ResultCardHeader;
