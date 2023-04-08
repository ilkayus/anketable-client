import { AnimatePresence } from 'framer-motion';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import { PageLinks } from './components/utils/constants';
import Pages from './pages';

function App() {
  const location = useLocation();
  return (
    <div className="max-w-screen-sm mx-auto mt-2 pb-4 h-[100vh]">
      <AnimatePresence mode="wait">
        <Routes key={location.pathname} location={location}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Pages.Homepage />} />
            {/* <Route path="anketable-client" element={<Pages.Homepage />} /> */}
            <Route path={PageLinks.HOMEPAGE} element={<Pages.Homepage />} />
            <Route
              path={PageLinks.CREATE_POLL_PAGE}
              element={<Pages.CreatePoll />}
            />
            <Route
              path={PageLinks.JOIN_POLL_PAGE}
              element={<Pages.JoinPoll />}
            />
            <Route
              path={PageLinks.WAITING_ROOM}
              element={<Pages.WaitingRoom />}
            />
            <Route path={PageLinks.ERROR_PAGE} element={<Pages.ErrorPage />} />
            <Route path="*" element={<Pages.NoMatch />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
