/* eslint-disable react/no-array-index-key */
import React from 'react';
import ResultCardScores from './ResultCardScores';
import type { Poll } from '../../types/polls.types';
import ResultCardPercentage from './ResultCardPercentage';
import ResultCardVotes from './ResultCardVotes';
import ResultCardMeter from './ResultCardMeter';

export interface Props {
  poll: Poll;
}
// TODO show results with piechart
const ResultsList = ({ poll }: Props) => {
  const { results } = poll;
  const totalScore =
    results.reduce((prev, result) => prev + result.score, 0) / 100;

  const percentages: Record<string, number> = {};
  results.forEach((result) => {
    percentages[result.nominationID] = result.score / totalScore;
  });
  return (
    <>
      <ResultCardMeter key={3} results={results} percentages={percentages} />
      <ResultCardVotes
        key={2}
        results={results}
        votesPerVoter={poll.votesPerVoter}
      />
      <ResultCardPercentage
        key={3}
        results={results}
        percentages={percentages}
      />
      <ResultCardScores key={1} results={results} />
    </>
  );
};

export default ResultsList;
