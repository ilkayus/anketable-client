import React from "react";
import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <nav>
        <Link to="/">
          <h1 className="text-lg">Anketable</h1>
        </Link>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
};

export default Layout;
