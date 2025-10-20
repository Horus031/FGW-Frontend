import { AvatarFallback } from "@radix-ui/react-avatar";
import { Avatar, AvatarImage } from "../ui/avatar";
import { ChevronDown, LogOut, User } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../../api/requests/auth.api";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const DropdownMenu = () => {
  const [isShow, setIsShow] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { mutate: handleLogout } = useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      localStorage.clear();
      navigate("/login");
      setIsShow(false);
    },
  });

  const handleNavigate = (path: string) => {
    navigate(`/${path}`);
    setIsShow(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsShow(false);
      }
    };

    if (isShow) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isShow]);

  return (
    <div className=" bg-white flex flex-col justify-center">
      <div className="flex items-center justify-center">
        <div ref={dropdownRef}  className=" relative inline-block text-left dropdown">
          <span className="shadow-sm">
            <button
              onClick={() => setIsShow(!isShow)}
              className="flex items-center gap-2 cursor-pointer w-full text-gray-700 bg-white "
              type="button"
              aria-haspopup="true"
              aria-expanded="true"
              aria-controls="headlessui-menu-items-117"
            >
              <Avatar className="size-8 2xl:size-11">
                <AvatarImage src=".." />
                <AvatarFallback className="text-base w-full lg:leading-8 2xl:leading-11 2xl:text-xl bg-bright text-white">
                  NV
                </AvatarFallback>
              </Avatar>

              <ChevronDown className="text-primary size-4 2xl:size-5" />
            </button>
          </span>
          <div className={`${isShow ? "block" : "hidden"}`}>
            <div
              className="absolute right-0 w-55 mt-2 origin-top-right font-public text-primary font-medium bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
              aria-labelledby="headlessui-menu-button-1"
              id="headlessui-menu-items-117"
              role="menu"
            >
              <div className="flex flex-col gap-2 px-5 py-3">
                <p className="text-lg">Vo Minh Nghia</p>
                <p className="text-gray-400">GCS230351</p>
              </div>
              <button
                onClick={() => handleNavigate("profile")}
                className="text-lg flex items-center gap-4 w-full menu-items"
                role="menuitem"
              >
                <User className="size-6 text-primary" />
                Profile
              </button>
              <button
                onClick={() => handleLogout()}
                className="text-lg text-danger hover:text-danger gap-4 w-full flex items-center menu-items"
                role="menuitem"
              >
                <LogOut className="size-6 text-danger" />
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropdownMenu;
