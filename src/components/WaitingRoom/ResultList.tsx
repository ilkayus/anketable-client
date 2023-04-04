/* eslint-disable react/no-array-index-key */
import React from 'react';
import ResultCard from './ResultCard';
import type { Results } from '../../types/polls.types';

export interface Props {
  results: Results[];
}

const ResultsList = ({ results }: Props) => (
  <div className="mx-auto max-h-full flex flex-col">
    {results.map((result, i) => (
      <ResultCard key={i} results={result} />
    ))}
  </div>
);

export default ResultsList;
