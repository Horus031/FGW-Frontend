
import LoginForm from "../../../components/LoginPage/LoginForm";

const LoginPage = () => {
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
