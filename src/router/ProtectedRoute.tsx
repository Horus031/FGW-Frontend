import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../store/user";

type ProtectedRouteProps = {
  allowedRoles?: string[];
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = (props) => {
  const { user } = useUserStore();
  const { allowedRoles } = props;

  if (allowedRoles) {
    const role = user?.role;
    
    if (!role?.name || !allowedRoles.includes(role.name)) {
      return <Navigate to="/not-found" replace />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;