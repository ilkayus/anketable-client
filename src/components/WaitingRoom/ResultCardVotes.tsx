/* eslint-disable function-paren-newline */
/* eslint-disable no-confusing-arrow */
import { rankColor } from '../../helpers/app.helpers';
import type { Results } from '../../types/polls.types';
import AnimatedPage from '../utils/AnimatedPage';

export interface Props {
  results: Readonly<Results>;
  votesPerVoter: number;
  animationType?: 'horizontal-toleft' | 'horizontal-toright';
}

const ResultCardVotes = ({
  results,
  votesPerVoter,
  animationType = 'horizontal-toright',
}: Props) => (
  <AnimatedPage animationType={animationType}>
    <div className="divide-y-2 overflow-y-auto pr-4">
      {results.map((result) => (
        <div
          key={result.nominationID}
          className="grid grid-cols-3 gap-4 py-1 items-center"
        >
          <div className="col-span-2">{result.nominationText}</div>
          <div className="flex flex-row-reverse gap-1 justify-start">
            {result.votes.map((vote, i) =>
              i >= votesPerVoter ? null : (
                <div
                  className={`min-w-[1.5rem] h-6 rounded-md border-[1px] ${rankColor(
                    i + 1,
                  )}`}
                >
                  <span className="flex justify-center items-center text-lg h-full w-full">
                    {vote}
                  </span>
                </div>
              ),
            )}
          </div>
        </div>
      ))}
    </div>
  </AnimatedPage>
);

export default ResultCardVotes;
