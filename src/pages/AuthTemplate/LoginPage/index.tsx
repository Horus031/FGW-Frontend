// import { useQuery } from "@tanstack/react-query";
import LoginForm from "../../../components/LoginPage/LoginForm";
// import { exchangeToken } from "../../../api/requests/auth.api";

const LoginPage = () => {
  // const code = "fd10699c-f1d5-45d4-a9d8-9cb972a70248"

  // console.log("Login", code)

  // const { data } = useQuery({
  //   queryKey: ["exchange-token", code],
  //   queryFn: () => exchangeToken(code),
  //   retry: false,
  //   refetchOnWindowFocus: false,
  //   staleTime: 60_000,
  // });

  // console.log(data);

  return (
    <div className="min-h-screen">
      <div className="relative">
        <img
          src="/images/Login/Background.webp"
          alt=""
          className="bg-cover size-full h-screen bg-center"
        />

        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
