/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
export interface Props {
  rank?: number;
  value: string;
  onSelect: () => void;
}

const RankedCheckBox = ({ value, rank, onSelect }: Props) => {
  const rankColor = (t?: number) => {
    switch (t) {
      case 1:
        return 'bg-green-300/50 border-green-600';
      case 2:
        return 'bg-yellow-300/50 border-yellow-600';
      case 3:
        return 'bg-orange-300/50 border-orange-600';
      case 4:
        return 'bg-red-300/50 border-red-600';
      case 5:
        return 'bg-blue-300/50 border-blue-600';
      default:
        return 'border-darkprimary-700 dark:border-gray-300';
    }
  };
  return (
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
};

export default RankedCheckBox;
