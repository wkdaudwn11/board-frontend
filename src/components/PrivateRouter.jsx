import { useLocation, Navigate } from "react-router-dom";

const PrivateRouter = ({ children }) => {
  const location = useLocation();
  const accessToken = sessionStorage.getItem("ACCESS_TOKEN");

  if (!accessToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRouter;
