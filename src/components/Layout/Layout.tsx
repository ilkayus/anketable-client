import { Link, Outlet } from 'react-router-dom';
import NavbarHeader from './NavbarHeader';
import { useAppSelector } from '../../hooks/typedReduxHooks';
import { selectPollState } from '../../features/poll/pollSlice';
import Loader from '../utils/Loader';
import ToggleTheme from './ToggleTheme';

const Layout = () => {
  const state = useAppSelector(selectPollState);

  return (
    <div>
      <nav className="flex flex-row justify-between items-center sticky top-0 z-40 mt-2 mb-1 h-12 w-full bg-white/60 dark:bg-darkprimary-900/60 backdrop-blur-[5px]">
        <Link to="/">
          <NavbarHeader />
        </Link>
        <ToggleTheme />
      </nav>
      <hr className=" border-gray-900 dark:border-darkprimary-300" />
      {state.pending ? (
        <Loader />
      ) : (
        <div className="max-w-screen-sm mx-auto py-4 px-4 overflow-y-scroll flex flex-col justify-center">
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default Layout;
