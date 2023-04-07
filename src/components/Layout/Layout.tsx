import { Link, Outlet } from 'react-router-dom';
import NavbarHeader from './NavbarHeader';
import { useAppSelector } from '../../hooks/typedReduxHooks';
import { selectPollState } from '../../features/poll/pollSlice';
import ToggleTheme from './ToggleTheme';
import Loader from '../utils/Loader';

const Layout = () => {
  const state = useAppSelector(selectPollState);

  return (
    <div className="overflow-x-hidden overflow-y-scroll h-full max-w-screen-sm noScrollbar">
      <nav className="flex flex-row justify-between items-center sticky top-0 z-40 mb-1 h-10 w-full bg-white/60 dark:bg-darkprimary-900/60 backdrop-blur-[5px]">
        <Link to="/">
          <NavbarHeader />
        </Link>
        <ToggleTheme />
      </nav>
      <hr className=" border-gray-900 dark:border-darkprimary-300" />
      {state.pending ? (
        <Loader />
      ) : (
        <div className="mx-auto py-4 px-4 flex flex-col justify-center h-[calc(100%-50px)] ">
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default Layout;
