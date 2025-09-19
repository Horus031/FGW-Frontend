import LoginForm from "@/components/LoginForm";

const LoginPage = () => {
  return (
    <div className="bg-[#00033D] min-h-screen relative overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center justify-between h-screen z-10 relative">
        <div className="absolute mx-auto top-6 lg:left-1/8 lg:top-1/4">
          <img className="size-64" src="/images/logoWithName.svg" alt="" />
        </div>

        <div className="absolute bottom-0 w-full h-fit px-8 py-16 rounded-t-lg lg:right-0 lg:w-5/12 lg:h-full bg-white lg:p-16 lg:rounded-tl-lg lg:rounded-bl-xl">
          <div className="flex flex-col justify-center h-full gap-36">
            <LoginForm />

            <div className="flex flex-col items-center text-[#00033D] text-sm gap-2">
                <span className="hidden lg:block">Mobile App for Student and Parent is ready at</span>
                <div className="hidden lg:flex gap-2 p-2">
                <button className="cursor-pointer">
                  <img src="/images/appstore.svg" alt="" />
                </button>
                <button className="cursor-pointer">
                  <img src="/images/chplay.svg" alt="" />
                </button>
                </div>
              <span>Powered by Greenwich University</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute translate-x-44 -translate-y-12 top-1/4 lg:inset-0 lg:flex lg:items-center lg:justify-center">
        <img src="/images/GWLogo.svg" alt="Greenwich Logo"/>
      </div>
    </div>
  );
};

export default LoginPage;
