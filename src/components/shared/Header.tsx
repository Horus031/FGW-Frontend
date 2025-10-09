import { Input } from "../ui/input";
import { Bell, ChevronDown, LogOut, Search, User } from "lucide-react";
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

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="fixed top-0 min-w-screen py-3 bg-white z-50 border-b border-gray-300 font-public">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-14 basis-8/12">
          <div>
            <LogoWithName />
          </div>

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
          </div>
        </div>

        <div className="flex items-center justify-between gap-9 basis-4/12">
          <div className="relative flex flex-1">
            <Search
              className="absolute top-1/2 -translate-y-1/2 left-2 text-gray-500"
              size={24}
            />
            <Input placeholder="Search..." className="pl-10 font-medium" />
          </div>

          <div className="flex items-center gap-4">
            <button className="text-primary cursor-pointer">
              <Bell size={32} />
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none">
                <div className="flex items-center gap-2 cursor-pointer">
                  <Avatar className="size-11">
                    <AvatarImage src=".." />
                    <AvatarFallback className="text-xl bg-bright text-white">
                      NV
                    </AvatarFallback>
                  </Avatar>

                  <ChevronDown className="text-primary" size={20} />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48 font-public text-primary font-medium"

              >
                <DropdownMenuLabel
                  className="p-2.5 flex flex-col gap-2.5  border-b-1 pb-3
                "
                >
                  <span className="text-primary text-lg">Vo Minh Nghia</span>
                  <span className="text-gray-400">GCS230351</span>
                </DropdownMenuLabel>
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => navigate("/profile")} className="py-3 text-lg"><User className="size-6 text-primary"/>
                    My Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="py-3 text-lg text-danger hover:text-danger"><LogOut className="size-6 text-danger"/> Log Out</DropdownMenuItem>
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
