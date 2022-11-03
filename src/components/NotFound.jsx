import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <button onClick={() => navigate("/")}>Go to Board List</button>
    </div>
  );
};

export default NotFound;
