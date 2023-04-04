/* eslint-disable react/no-array-index-key */
import React from 'react';
import ResultCard from './ResultCard';
import type { Results } from '../../types/polls.types';

export interface Props {
  results: Results[];
}

const ResultsList = ({ results }: Props) => (
  <div className="mx-auto max-h-full flex flex-col">
    {/* <HorizontalSwipeList> */}
    {results.map((result, i) => (
      // Can use index as we'll never change list
      <ResultCard key={i} results={result} />
    ))}
    {/* </HorizontalSwipeList> */}
  </div>
);

export default ResultsList;
