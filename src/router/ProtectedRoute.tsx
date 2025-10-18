import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../store/user";

const ProtectedRoute: React.FC = () => {
  const user = useUserStore((state) => state.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
