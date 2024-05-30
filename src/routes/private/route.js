import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const PrivateRoute = ({ component: Component, route, ...rest }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/login" replace state={{ from: route }} />
  );
};

export default PrivateRoute;
