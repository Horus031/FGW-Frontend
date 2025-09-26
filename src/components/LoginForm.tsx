const LoginForm = () => {
  return (
    <div className="absolute top-1/2 left-1/2 bg-white px-14 py-12 rounded-xl -translate-1/2 w-xl">
      <div className="flex flex-col justify-center items-center gap-12 w-full">
        <img src="/images/Login/Logo.svg" alt="" className="w-40" />

        <div className="flex flex-col gap-8 w-full">
          <div className="font-public flex flex-col items-center gap-6">
            <h2 className="font-public text-2xl font-bold text-primary">
              Academic Portal
            </h2>

            <button
              // onClick={() => login()}
              className="flex justify-center w-full gap-2 bg-secondary font-medium cursor-pointer text-lg px-6 py-3 text-white rounded-md"
            >
              <img src="/images/Login/GoogleIcon.svg" alt="" />
              Login with you email
            </button>
          </div>

          <span className="bg-grey-400 border"></span>

          <div className="flex flex-col items-center text-[#00033D] text-sm gap-2">
            <span className="hidden lg:block">
              Mobile App for Student and Parent is ready at
            </span>
            <div className="hidden lg:flex gap-2 p-2">
              <button className="cursor-pointer">
                <img src="/images/Login/AppStoreButton.svg" alt="" />
              </button>
              <button className="cursor-pointer">
                <img src="/images/Login/GooglePlayButton.svg" alt="" />
              </button>
            </div>
            <span>
              &copy; Powered by{" "}
              <span className="text-blue-500 underline">Greenwich Vietnam</span>{" "}
              | <span className="text-blue-500 underline">CMS</span>{" "}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
