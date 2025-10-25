import React, { useEffect, useState } from "react";
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
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["user-info"],
    queryFn: getMe,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 60_000,
  });

  useEffect(() => {
    if (isSuccess && data) {
      // Validate that we have at least an email or id
      if (!data.id && !data.email) {
        clearUser();
        return;
      }

      setUser({
        id: data.id,
        email: data.email,
        role: data.role,
        avatar: data.avatar,
        givenName: data.givenName,
        student: data.student,
        campus: data.campus,
      });
    }
  }, [isSuccess, data, setUser, clearUser]);

  useEffect(() => {
    if (isError) {
      clearUser();
      setShouldRedirect(true);
    }
  }, [isError, clearUser]);

  if (isLoading) return null;

  if (isError && shouldRedirect) return <Navigate to="/login" replace />;

  if (allowedRoles) {
    const role = user?.role;
    if (!role?.name || !allowedRoles.includes(role.name)) {
      return <Navigate to="/not-found" replace />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;
