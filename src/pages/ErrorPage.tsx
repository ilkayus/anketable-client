import { Link } from 'react-router-dom';
import AnimatedPage from '../components/utils/AnimatedPage';

const ErrorPage = ({ children }: { children?: JSX.Element | string }) => {
  return (
    <AnimatedPage>
      <>
        <div>
          <h2>
            There must have been a mistake!
            <br />
            {children}
          </h2>
          <p>
            <Link to="/">Go to the home page</Link>
          </p>
        </div>
      </>
    </AnimatedPage>
  );
};

export default ErrorPage;
