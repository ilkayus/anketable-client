import { Link, Outlet } from 'react-router-dom';
import NavbarHeader from './NavbarHeader';

const Layout = () => {
  return (
    <div>
      <nav>
        <Link to="/">
          <NavbarHeader />
        </Link>
      </nav>
      <hr />
      <div className="max-w-screen-sm h-screen mx-auto py-8 px-4 overflow-y-hidden flex flex-col justify-center">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
