import React from "react";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "../../contexts/AuthProvider";
import Spinner from "../Spinner";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Spinner></Spinner>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
