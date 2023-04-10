import type { Results } from '../../types/polls.types';
import AnimatedPage from '../utils/AnimatedPage';

export interface Props {
  results: Readonly<Results>;
  percentages: Record<string, number>;
  animationType?: 'horizontal-toleft' | 'horizontal-toright';
}

const ResultCardPercentage = ({
  results,
  percentages,
  animationType = 'horizontal-toright',
}: Props) => (
  <AnimatedPage animationType={animationType}>
    <div className="divide-y-2 overflow-y-auto pr-4">
      {results.map((result) => (
        <div
          key={result.nominationID}
          className="grid grid-cols-3 gap-4 my-1 items-center"
        >
          <div className="col-span-2">{result.nominationText}</div>
          <div className="col-span-1 text-right">
            {percentages[result.nominationID].toFixed(2)} %
          </div>
        </div>
      ))}
    </div>
  </AnimatedPage>
);

export default ResultCardPercentage;
