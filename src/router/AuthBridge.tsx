import { useQuery } from "@tanstack/react-query";
import LoadingPage from "../components/shared/LoadingPage";
import { useLocation, useNavigate } from "react-router-dom";
import { exchangeToken } from "../api/requests/auth.api";
import { useEffect } from "react";

const AuthBridge = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get("code");

  const { data, isSuccess, isError, error } = useQuery({
    queryKey: ["exchange-token", code],
    queryFn: async () => exchangeToken(code),
    enabled: !!code, // only run if code exists
    retry: false, // don't retry on CORS/network errors
  });

  useEffect(() => {
    if (isSuccess && data) {
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      navigate("/", { replace: true });
    }
  }, [isSuccess, data, navigate]);

  useEffect(() => {
    if (isError) {
      console.error("Auth exchange failed:", error);
      navigate("/login", { replace: true });
    }
  }, [isError, error, navigate]);

  return <LoadingPage />;
};

export default AuthBridge;
