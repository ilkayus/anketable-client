import React from 'react';
import HomepageActions from '../components/Homepage/HomepageActions';
import HomepageHeader from '../components/Homepage/HomepageHeader';
import AnimatedPage from '../components/utils/AnimatedPage';

const Homepage = () => {
  return (
    <AnimatedPage>
      <>
        <HomepageHeader />
        <HomepageActions />
      </>
    </AnimatedPage>
  );
};

export default Homepage;
