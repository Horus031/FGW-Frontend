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

  // Add 'error' to the destructuring
  const { data, isLoading, isError, isSuccess, error } = useQuery({
    queryKey: ["user-info"],
    queryFn: getMe,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 60_000,
  });

  useEffect(() => {
    if (isSuccess && data) {
      console.log("ProtectedRoute - getMe response:", data);
      console.log("ProtectedRoute - response type:", typeof data);

      // Check if data is a proper UserInfo object
      if (typeof data === "string") {
        console.error("ProtectedRoute - Backend returned string instead of user object:", data);
        console.error("ProtectedRoute - This is likely a backend API issue");
        clearUser();
        return;
      }

      // Validate that we have at least an email or id
      if (!data.id && !data.email) {
        console.error("ProtectedRoute - Invalid user data received:", data);
        clearUser();
        return;
      }

      setUser({
        id: data.id,
        email: data.email,
        role: data.role,
        avatar: data.avatar,
        fullName: data.fullName,
        campus: data.campus,
        academicYear: data.academicYear,
        yearOfStudy: data.yearOfStudy,
        faculty: data.faculty,
      });
      console.log("ProtectedRoute - User loaded successfully:", data.email);
    }
  }, [isSuccess, data, setUser, clearUser]);

  useEffect(() => {
    if (isError) {
      console.error("ProtectedRoute - getMe failed:", error);
      // console.error("ProtectedRoute - Error details:", {
      //   message: error?.message,
      //   response: error?.response?.data,
      //   status: error?.response?.status,
      // });

      // Add a 3 second delay before redirecting so you can see the error in console
      setTimeout(() => {
        clearUser();
        setShouldRedirect(true);
      }, 3000);
    }
  }, [isError, error, clearUser]);

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