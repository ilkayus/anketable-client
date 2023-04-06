/* eslint-disable function-paren-newline */
/* eslint-disable no-confusing-arrow */
import { rankColor } from '../../helpers/app.helpers';
import type { Results } from '../../types/polls.types';

export interface Props {
  results: Readonly<Results>;
  votesPerVoter: number;
}

const ResultCardVotes = ({ results, votesPerVoter }: Props) => (
  <>
    <div className="grid grid-cols-3 gap-4 pb-2 my-2 border-b-2 border-solid border-purple-70 pr-4">
      <div className="col-span-2 font-semibold">Candidate</div>
      <div className="col-span-1 font-semibold text-right">Votes</div>
    </div>
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
  </>
);

export default ResultCardVotes;
