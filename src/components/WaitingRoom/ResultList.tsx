/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @typescript-eslint/indent */
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import ResultCardScores from './ResultCardScores';
import type { Poll } from '../../types/polls.types';
import ResultCardPercentage from './ResultCardPercentage';
import ResultCardVotes from './ResultCardVotes';
import ResultCardMeter from './ResultCardMeter';
import SelectorDot from '../utils/SelectorDot';
import SwipeableWrapper from '../utils/SwipeableWrapper';

export interface Props {
  poll: Poll;
}
// TODO show results with piechart
const ResultsList = ({ poll }: Props) => {
  const [card, setCard] = useState(0);
  const [animationType, setAnimationType] = useState<
    'horizontal-toleft' | 'horizontal-toright'
  >('horizontal-toright');

  const { results } = poll;
  const totalScore =
    results.reduce((prev, result) => prev + result.score, 0) / 100;
  const percentages: Record<string, number> = {};
  results.forEach((result) => {
    percentages[result.nominationID] = result.score / totalScore;
  });
  const handleDotClick = (selected: number) => {
    if (card === selected) return;
    setAnimationType(
      card > selected ? 'horizontal-toleft' : 'horizontal-toright',
    );
    setCard(selected);
  };

  return (
    <>
      <div className="flex flex-row justify-center gap-6 my-1">
        <SelectorDot selected={card} onClick={handleDotClick} value={0} />
        <SelectorDot selected={card} onClick={handleDotClick} value={1} />
        <SelectorDot selected={card} onClick={handleDotClick} value={2} />
        <SelectorDot selected={card} onClick={handleDotClick} value={3} />
      </div>
      <SwipeableWrapper value={card} handler={handleDotClick}>
        <AnimatePresence mode="wait">
          {card === 0 && (
            <ResultCardScores
              key={0}
              results={results}
              animationType={animationType}
            />
          )}
          {card === 1 && (
            <ResultCardPercentage
              key={1}
              results={results}
              percentages={percentages}
              animationType={animationType}
            />
          )}
          {card === 2 && (
            <ResultCardVotes
              key={2}
              results={results}
              votesPerVoter={poll.votesPerVoter}
              animationType={animationType}
            />
          )}
          {card === 3 && (
            <ResultCardMeter
              key={3}
              results={results}
              percentages={percentages}
              animationType={animationType}
            />
          )}
        </AnimatePresence>
      </SwipeableWrapper>
    </>
  );
};

export default ResultsList;
