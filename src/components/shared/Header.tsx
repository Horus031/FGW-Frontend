import { ChevronDown, LogOut, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { NavLink, useNavigate } from "react-router-dom";
import LogoWithName from "../icons/LogoWithName";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import BellIcon from "../icons/BellIcon";
import MagnifyClass from "../icons/MagnifyClass";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../../api/requests/auth.api";

const Header = () => {
  const navigate = useNavigate();
  const {mutate: handleLogout} = useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      localStorage.clear();
      navigate("/login");
    }
  })

  return (
    <div className="fixed top-0 min-w-screen py-3 bg-white z-50 border-b border-gray-300 font-public">
      <div className="md:container md:mx-auto px-8 flex items-center justify-between">
        <div className="flex items-center gap-14 basis-8/12">
          <NavLink to="/" className="cursor-pointer">
            <LogoWithName />
          </NavLink>

          <div className="flex items-center gap-9 text-primary font-semibold text-lg h-full">
            <NavLink to="/" className="p-2 hover:bg-gray-200 cursor-pointer">
              Home
            </NavLink>
            <NavLink
              to="/schedule"
              className="p-2 hover:bg-gray-200 cursor-pointer"
            >
              Schedule
            </NavLink>
            <button className="p-2 hover:bg-gray-200 cursor-pointer">
              Library
            </button>
            <button className="p-2 hover:bg-gray-200 cursor-pointer">
              Thread
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between gap-9">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button className="text-primary cursor-pointer p-1.5">
                <MagnifyClass className="size-6 2xl:size-8" />
              </button>

              <button className="text-primary cursor-pointer p-1.5">
                <BellIcon className="size-6 2xl:size-8" />
              </button>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none">
                <div className="flex items-center gap-2 cursor-pointer">
                  <Avatar className="size-8 2xl:size-11">
                    <AvatarImage src=".." />
                    <AvatarFallback className="text-base 2xl:text-xl bg-bright text-white">
                      NV
                    </AvatarFallback>
                  </Avatar>

                  <ChevronDown className="text-primary size-4 2xl:size-5" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 font-public text-primary font-medium container -translate-x-8">
                <DropdownMenuLabel
                  className="p-2.5 flex flex-col gap-2.5  border-b-1 pb-3
                "
                >
                  <span className="text-primary text-lg">Vo Minh Nghia</span>
                  <span className="text-gray-400">GCS230351</span>
                </DropdownMenuLabel>
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onClick={() => navigate("/profile")}
                    className="py-3 text-lg"
                  >
                    <User className="size-6 text-primary" />
                    My Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleLogout()} className="py-3 text-lg text-danger hover:text-danger">
                    <LogOut className="size-6 text-danger" /> Log Out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
