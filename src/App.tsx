import { Routes, Route, Outlet, Link } from "react-router-dom";
import Layout from "./components/Layout";
import Pages from "./pages";

function App() {
  return (
    <div className="page mobile-height max-w-screen-sm mx-auto py-8 px-4 overflow-y-hidden">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Pages.Homepage />} />
          <Route path="create" element={<Pages.CreatePoll />} />
          <Route path="join" element={<Pages.JoinPoll />} />
          <Route path="*" element={<Pages.NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
