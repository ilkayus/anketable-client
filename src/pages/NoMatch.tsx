import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedPage from '../components/utils/AnimatedPage';

const NoMatch = () => (
  <AnimatedPage>
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  </AnimatedPage>
);

export default NoMatch;
