// import { useState } from "react";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "./ui/select";
// import { Button } from "./ui/button";
// import GoogleIcon from "./icons/GoogleIcons";
// import FPTIcon from "./icons/FPTIcon";
// import { useGoogleLogin } from "@react-oauth/google";
// import jwt_decode from "jwt-decode";

// interface GoogleJwt {
//   email: string;
//   name: string;
//   picture: string;
// }

const LoginForm = () => {
  // const [loginTabs, setLoginTabs] = useState("Student");

  // const handleTabs = (tabName: string) => {
  //   setLoginTabs(tabName);
  // };

  // const login = useGoogleLogin({
  //   onSuccess: (tokenResponse) => {
  //     console.log("Google login success:", tokenResponse);

  //   },
  //   onError: (error) => console.error("Login Failed:", error),
  // });

  return (
    <div className="absolute bg-white px-14 py-12 left-0 right-0 top-0 w-fit">
        <div className="flex flex-col gap-12">
          <img src="/images/Login/Logo.svg" alt="" />

          <div>
            <h2 className="font-public text-2xl font-bold">Academic Portal</h2>
          </div>
        </div>
    </div>
  );
};

{/* <Button onClick={() => login()} className="bg-[#005EB8] font-normal cursor-pointer">
            <GoogleIcon /> Sign in with FPT Gmail
          </Button> */}

export default LoginForm;
