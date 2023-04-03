import { Link, Outlet } from 'react-router-dom';
import NavbarHeader from './NavbarHeader';
import { useAppSelector } from '../../hooks/typedReduxHooks';
import { selectPollState } from '../../features/poll/pollSlice';
import Loader from '../utils/Loader';

const Layout = () => {
  const state = useAppSelector(selectPollState);
  return (
    <div>
      <nav>
        <Link to="/">
          <NavbarHeader />
        </Link>
      </nav>
      <hr />
      {state.pending ? (
        <Loader />
      ) : (
        <div className="max-w-screen-sm h-screen mx-auto py-8 px-4 overflow-y-hidden flex flex-col justify-center">
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default Layout;
