import { NavLink } from "react-router-dom";
import LogoWithName from "../icons/LogoWithName";
import BellIcon from "../icons/BellIcon";
import MagnifyClass from "../icons/MagnifyClass";
import DropdownMenu from "./DropdownMenu";

const Header = () => {
  

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

            <DropdownMenu/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
