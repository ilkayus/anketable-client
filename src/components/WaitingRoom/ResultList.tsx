/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/indent */
import { useMemo, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import ResultCardScores from './ResultCardScores';
import type { Poll } from '../../types/polls.types';
import ResultCardPercentage from './ResultCardPercentage';
import ResultCardVotes from './ResultCardVotes';
import ResultCardMeter from './ResultCardMeter';
import SelectorDot from '../utils/SelectorDot';
import SwipeableWrapper from '../utils/SwipeableWrapper';
import ResultCardHeader from './ResultCardHeader';

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

  const percentages: Record<string, number> = useMemo(() => {
    const p: Record<string, number> = {};
    const totalScore =
      results.reduce((prev, result) => prev + result.score, 0) / 100;
    results.forEach((result) => {
      p[result.nominationID] = result.score / totalScore;
    });
    return p;
  }, [results]);

  const handleDotClick = (selected: number) => {
    if (card === selected) return;
    setAnimationType(
      card > selected
        ? card === 3 && selected === 0
          ? 'horizontal-toleft'
          : 'horizontal-toright'
        : card === 0 && selected === 3
        ? 'horizontal-toright'
        : 'horizontal-toleft',
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
        <ResultCardHeader />
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
