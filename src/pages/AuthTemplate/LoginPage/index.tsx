import LoginForm from "@/components/LoginForm";

const LoginPage = () => {
  return (
    <div className="min-h-screen">
      <div className="relative">
        <img src="/images/Login/Background.png" alt=""  className="bg-cover size-full h-screen bg-center"/>

        <LoginForm/>
      </div>
    </div>
  );
};

export default LoginPage;
