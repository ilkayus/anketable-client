import { rankMeterColor } from '../../helpers/app.helpers';
import type { Results } from '../../types/polls.types';
import AnimatedPage from '../utils/AnimatedPage';

export interface Props {
  results: Readonly<Results>;
  percentages: Record<string, number>;
  animationType?: 'horizontal-toleft' | 'horizontal-toright';
}

const ResultCardMeter = ({
  results,
  percentages,
  animationType = 'horizontal-toright',
}: Props) => (
  <AnimatedPage animationType={animationType}>
    <>
      <div className="grid grid-cols-3 gap-4 pb-2 my-2 border-b-2 border-solid border-purple-70 pr-4">
        <div className="col-span-2 font-semibold">Candidate</div>
        <div className="col-span-1 font-semibold text-right">Score</div>
      </div>
      <div className="divide-y-2 overflow-y-auto pr-4">
        {results.map((result, i) => (
          <div
            key={result.nominationID}
            className="grid grid-cols-5 sm:grid-cols-3 gap-4 my-1 items-center"
          >
            <div className="col-span-2 sm:col-span-1">
              {result.nominationText}
            </div>
            <div className="sm:col-span-2 col-span-3 w-full h-full">
              <div className=" grid sm:grid-cols-5 grid-cols-3 w-full h-full">
                <meter
                  className={`sm:col-span-4 col-span-2 w-full h-full ${rankMeterColor(
                    i + 1 < results.length ? i : 99,
                  )}`}
                  min="0"
                  max="100"
                  value={percentages[result.nominationID]}
                >
                  {percentages[result.nominationID]} out of 100
                </meter>
                <div className="col-span-1 justify-self-end">
                  {percentages[result.nominationID].toFixed(2)} %
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  </AnimatedPage>
);

export default ResultCardMeter;
