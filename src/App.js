import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PrivateRouter from "./components/PrivateRouter";
import Login from "./components/Login";
import Join from "./components/Join";
import BoardList from "./components/BoardList";
import BoardDetail from "./components/BoardDetail";

const App = () => {
  return (
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
      </Routes>
    </Router>
  );
};

export default App;
