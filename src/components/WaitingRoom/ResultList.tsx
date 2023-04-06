import { useState } from 'react';
import ResultCardScores from './ResultCardScores';
import type { Poll } from '../../types/polls.types';
import ResultCardPercentage from './ResultCardPercentage';
import ResultCardVotes from './ResultCardVotes';
import ResultCardMeter from './ResultCardMeter';
import SelectorDot from '../utils/SelectorDot';

export interface Props {
  poll: Poll;
}
// TODO show results with piechart
const ResultsList = ({ poll }: Props) => {
  const [card, setCard] = useState(0);
  const { results } = poll;
  const totalScore =
    results.reduce((prev, result) => prev + result.score, 0) / 100;
  const percentages: Record<string, number> = {};
  results.forEach((result) => {
    percentages[result.nominationID] = result.score / totalScore;
  });

  return (
    <>
      {card === 0 && <ResultCardScores results={results} />}
      {card === 1 && (
        <ResultCardPercentage results={results} percentages={percentages} />
      )}
      {card === 2 && (
        <ResultCardVotes results={results} votesPerVoter={poll.votesPerVoter} />
      )}
      {card === 3 && (
        <ResultCardMeter key={3} results={results} percentages={percentages} />
      )}
      <div className="flex flex-row justify-center gap-4 my-2">
        <SelectorDot selected={card} setSelected={setCard} value={0} />
        <SelectorDot selected={card} setSelected={setCard} value={1} />
        <SelectorDot selected={card} setSelected={setCard} value={2} />
        <SelectorDot selected={card} setSelected={setCard} value={3} />
      </div>
    </>
  );
};

export default ResultsList;
