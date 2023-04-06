/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { rankColor } from '../../helpers/app.helpers';

/* eslint-disable jsx-a11y/no-static-element-interactions */
export interface Props {
  rank?: number;
  value: string;
  onSelect: () => void;
}

const RankedCheckBox = ({ value, rank, onSelect }: Props) => (
  <div
    className="my-4 box relative flex flex-row justify-between items-center"
    onClick={() => {
      onSelect();
    }}
  >
    <div>{value}</div>
    <div className={`w-10 h-10 rounded-xl border-2 ${rankColor(rank)}`}>
      {rank && (
        <span className="flex justify-center items-center pt-[2px] text-2xl">
          {rank}
        </span>
      )}
    </div>
  </div>
);

export default RankedCheckBox;
