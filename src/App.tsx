import { Routes, Route, Outlet, Link } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import { PageLinks } from "./components/utils/constants";
import Pages from "./pages";

function App() {
  return (
    <div className="page mobile-height max-w-screen-sm mx-auto py-8 px-4 overflow-y-hidden">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Pages.Homepage />} />
          <Route path={PageLinks.HOMEPAGE} element={<Pages.Homepage />} />
          <Route
            path={PageLinks.CREATE_POLL_PAGE}
            element={<Pages.CreatePoll />}
          />
          <Route path={PageLinks.JOIN_POLL_PAGE} element={<Pages.JoinPoll />} />
          <Route path="*" element={<Pages.NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
