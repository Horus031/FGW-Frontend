import { useQuery } from "@tanstack/react-query";
import LoadingPage from "../components/shared/LoadingPage";
import { useUserStore } from "../store/user";
import { useLocation, useNavigate } from "react-router-dom";
import { exchangeToken } from "../api/requests/auth.api";

const AuthBridge = () => {
  const { setUser } = useUserStore();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get("code");

  const { data, isSuccess, isError } = useQuery({
    queryKey: ["user"],
    queryFn: async () => exchangeToken(code),
  });

  if (isSuccess) {
    setUser(data);
    navigate("/");
  }

  if (isError) {
    navigate("/login");
  }

  return (
    <div>
      <LoadingPage />

    </div>
  );
};

export default AuthBridge;
