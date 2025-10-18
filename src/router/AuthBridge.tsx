import { useQuery } from "@tanstack/react-query";
import LoadingPage from "../components/shared/LoadingPage";
import { useUserStore } from "../store/user";
import { useNavigate, useSearchParams } from "react-router-dom";
import { exchangeToken } from "../api/authApi/login";

const AuthBridge = () => {
  const { setUser } = useUserStore();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const code: string | null = searchParams.get("code");

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
