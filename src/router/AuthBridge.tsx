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
      navigate("/login", { replace: true });
    }
  }, [code, navigate]);

  const { data, isSuccess, isError } = useQuery({
    queryKey: ["exchange-token", code],
    queryFn: async () => exchangeToken(code),
    enabled: !!code,
    retry: false,
  });

  useEffect(() => {
    if (isSuccess && data) {
      // Validate that we have at least an email or id
      if (!data.id && !data.email) {
        navigate("/login", { replace: true });
        return;
      }

      // Save user data to Zustand store (which also saves to localStorage)
      setUser({
        id: data.id,
        email: data.email,
        role: data.role,
        avatar: data.avatar,
        givenName: data.givenName,
        student: data.student,
        campus: data.campus,
      });
      navigate("/", { replace: true });
    }
  }, [isSuccess, data, navigate, setUser]);

  useEffect(() => {
    if (isError) {
      navigate("/login", { replace: true });
    }
  }, [isError, navigate]);

  return <LoadingPage />;
};

export default AuthBridge;
