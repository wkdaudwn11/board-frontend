import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PrivateRouter from "./components/PrivateRouter";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Join from "./components/Join";
import NotFound from "./components/NotFound";
import BoardList from "./components/BoardList";
import BoardDetail from "./components/BoardDetail";

const App = () => {
  return (
    <Layout>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
          <Route
            path="/"
            element={
              <PrivateRouter>
                <BoardList />
              </PrivateRouter>
            }
          />
          <Route
            path="/detail/:id"
            element={
              <PrivateRouter>
                <BoardDetail />
              </PrivateRouter>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </Layout>
  );
};

export default App;
