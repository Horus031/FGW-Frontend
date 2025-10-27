import { useQuery } from "@tanstack/react-query";
import LoadingPage from "../components/shared/LoadingPage";
import { useLocation, useNavigate } from "react-router-dom";
import { exchangeToken } from "../api/requests/auth.api";
import { useEffect } from "react";
import { useUserStore } from "../store/user";

const AuthBridge = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get("code");
  const { setUser } = useUserStore();

  // If no code, redirect immediately
  useEffect(() => {
    if (!code) {
      // console.error("AuthBridge - No authorization code found in URL");
      // console.log("AuthBridge - Redirecting to login in 3 seconds...");
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 3000);
    }
  }, [code, navigate]);

  const { data, isSuccess, isError, error } = useQuery({
    queryKey: ["exchange-token", code],
    queryFn: async () => exchangeToken(code),
    enabled: !!code,
    retry: false,
  });

  useEffect(() => {
    if (isSuccess && data) {
      // console.log("AuthBridge - exchangeToken response:", data);
      // console.log("AuthBridge - response type:", typeof data);

      // Validate that we have at least an email or id
      if (!data.id && !data.email) {
        // console.error("AuthBridge - Invalid user data received:", data);
        // console.error("AuthBridge - This should not happen if exchangeToken properly fetched user data");
        navigate("/login", { replace: true });
        return;
      }

      // Save user data to Zustand store (which also saves to localStorage)
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
      // console.log("AuthBridge - User saved successfully:", data.email);
      // console.log("AuthBridge - Full user data:", data);

      // Add 2 second delay so you can see the console logs
      // console.log("AuthBridge - Navigating to home in 2 seconds...");
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 10000);
    }
  }, [isSuccess, data, navigate, setUser]);

  useEffect(() => {
    if (isError) {
      // console.error("AuthBridge - Auth exchange failed:", error);
      // console.error("AuthBridge - Error details:", {
      //   message: error?.message,
      //   response: error?.response?.data,
      //   status: error?.response?.status,
      // });
      // console.log("AuthBridge - Redirecting to login in 5 seconds...");

      // Add 5 second delay so you can see the error
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 5000);
    }
  }, [isError, error, navigate]);

  return <LoadingPage />;
};

export default AuthBridge;
