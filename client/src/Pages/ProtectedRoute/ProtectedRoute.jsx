import React from "react";
import isLoggedIn from "../../CustomHooks/IsLoggedIn";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  if (!isLoggedIn()) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
