import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import GoogleIcon from "./icons/GoogleIcons";
import FPTIcon from "./icons/FPTIcon";
import { useGoogleLogin } from "@react-oauth/google";
// import jwt_decode from "jwt-decode";

// interface GoogleJwt {
//   email: string;
//   name: string;
//   picture: string;
// }

const LoginForm = () => {
  const [loginTabs, setLoginTabs] = useState("Student");

  const handleTabs = (tabName: string) => {
    setLoginTabs(tabName);
  };

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log("Google login success:", tokenResponse);

    },
    onError: (error) => console.error("Login Failed:", error),
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="absolute text-xs left-4 -top-11 w-64 lg:static flex items-center font-bold shadow-xl/20 lg:w-full p-0.5 bg-[#DDDBDD] rounded-md text-[#00033D] lg:rounded-lg lg:text-base">
        <button
          onClick={() => handleTabs("Student")}
          className={`py-2 flex-1 cursor-pointer rounded-l-md ${
            loginTabs == "Student" ? "bg-white" : "bg-transparent"
          }`}
        >
          Staff & Students
        </button>

        <button
          onClick={() => handleTabs("Parent")}
          className={`py-2 flex-1 cursor-pointer rounded-r-md ${
            loginTabs == "Parent" ? "bg-white" : "bg-transparent"
          }`}
        >
          Parents
        </button>
      </div>
      <h1 className="text-left text-base lg:text-2xl font-bold text-[#00033D]">
        Login For {loginTabs == "Student" ? "Staffs & Students" : "Parents"}
      </h1>
      <div className="flex flex-col gap-4">
        <Select>
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder="Select your campus" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="HN">Ha Noi</SelectItem>
            <SelectItem value="HCM">Ho Chi Minh</SelectItem>
            <SelectItem value="DN">Da Nang</SelectItem>
            <SelectItem value="CT">Can Tho</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex flex-col gap-4 text-white">
          <Button onClick={() => login()} className="bg-[#005EB8] font-normal cursor-pointer">
            <GoogleIcon /> Sign in with FPT Gmail
          </Button>
          {loginTabs == "Student" && (
            <Button className="bg-[#005EB8] font-normal cursor-pointer">
              <FPTIcon /> Sign in with FEID
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
