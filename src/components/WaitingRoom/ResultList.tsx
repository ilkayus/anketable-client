/* eslint-disable react/no-array-index-key */
import React from 'react';
import ResultCard from './ResultCard';
import type { Results } from '../../types/polls.types';

export interface Props {
  results: Results;
}
// TODO show results with piechart
const ResultsList = ({ results }: Props) => (
  <ResultCard key={1} results={results} />
);

export default ResultsList;
