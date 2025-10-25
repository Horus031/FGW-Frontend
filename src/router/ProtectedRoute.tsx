import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../store/user";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api/requests/auth.api";

type ProtectedRouteProps = {
  allowedRoles?: string[];
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = (props) => {
  const { user, setUser, clearUser } = useUserStore();
  const { allowedRoles } = props;

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["user-info"],
    queryFn: getMe,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 60_000,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setUser({
        id: data.id,
        email: data.email,
        role: data.role,
        avatar: data.avatar,
        givenName: data.givenName,
        student: data.student,
        campus: data.campus,
      });
      localStorage.setItem("user", JSON.stringify(data));
    }
  }, [isSuccess, data, setUser]);

  useEffect(() => {
    if (isError) {
      clearUser();
    }
  }, [isError, clearUser]);

  if (isLoading) return null;

  if (isError) return <Navigate to="/login" replace />;

  if (allowedRoles) {
    const role = user?.role;
    if (!role?.name || !allowedRoles.includes(role.name)) {
      return <Navigate to="/not-found" replace />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;
