import { Link, Outlet } from "react-router-dom";
import NavbarHeader from "./NavbarHeader";

const Layout = () => {
  return (
    <div>
      <nav>
        <Link to="/">
          <NavbarHeader />
        </Link>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
};

export default Layout;
