import { useState } from "react";
import { login } from "../../api/requests/auth.api";
import AppStoreButton from "../icons/AppStoreButton";
import GoogleIcon from "../icons/GoogleIcons";
import GooglePlayButton from "../icons/GooglePlayButton";
import LogoWithName from "../icons/LogoWithName";
import useSecretSequence from "../../hooks/useSecretSequence";

const SECRET_SEQUENCE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
];

const LoginForm = () => {
  const [adminVisible, setAdminVisible] = useState(false);

  useSecretSequence({
    secretSequence: SECRET_SEQUENCE,
    onMatched: () => setAdminVisible(true),
    timeoutMs: 1200,
  });
  return (
    <div className="absolute top-1/2 left-1/2 mx-auto bg-white px-14 py-12 rounded-xl -translate-1/2  w-xl">
      <div className="flex flex-col justify-center items-center gap-12 w-full">
        <LogoWithName />

        <div className="flex flex-col gap-8 w-full">
          <div className="font-public flex flex-col items-center gap-6">
            <h2 className="font-public text-2xl font-bold text-primary">
              Academic Portal
            </h2>

            {adminVisible && (
              <div
                style={{
                  marginTop: "2rem",
                  border: "2px dashed #333",
                  padding: "1rem",
                  background: "#fafafa",
                  borderRadius: 8,
                }}
              >
                <h2>👑 Admin Login (Hidden)</h2>
                <input
                  type="text"
                  placeholder="Admin username"
                  style={{ display: "block", marginBottom: 10, width: 250 }}
                />
                <input
                  type="password"
                  placeholder="Admin password"
                  style={{ display: "block", marginBottom: 10, width: 250 }}
                />
                <button>Admin Login</button>
                <p style={{ fontSize: 12, color: "#777" }}>
                  (This form only appears when the correct key sequence is entered)
                </p>
              </div>
            )}

            <button
              onClick={login}
              className="flex justify-center w-full gap-2 bg-secondary font-medium cursor-pointer text-lg px-6 py-3 text-white rounded-md"
            >
              <GoogleIcon />
              Login with you email
            </button>
          </div>

          <span className="bg-grey-400 border "></span>

          <div className="flex flex-col items-center text-[#00033D] text-sm">
            <span className="hidden lg:block">
              Mobile App for Student and Parent is ready at
            </span>
            <div className="hidden lg:flex md:flex gap-2 p-1">
              <button className="cursor-pointer">
                <AppStoreButton />
              </button>
              <button className="cursor-pointer">
                <GooglePlayButton />
              </button>
            </div>
            <span>
              &copy; Powered by{" "}
              <span className="text-secondary underline">
                Greenwich Vietnam
              </span>{" "}
              | <span className="text-secondary underline">CMS</span>{" "}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
