import { NavLink } from "react-router-dom";
import LogoWithName from "../icons/LogoWithName";
import BellIcon from "../icons/BellIcon";
import MagnifyClass from "../icons/MagnifyClass";
import DropdownMenu from "./DropdownMenu";

const Header = () => {
  return (
    <div className="fixed top-0 w-full py-3 bg-white z-40 border-b border-gray-300 font-public">
      <div className="px-20 mx-auto md:max-w-screen-2xl flex items-center justify-between">
        <div className="flex items-center gap-14 basis-8/12">
          <NavLink to="/" className="cursor-pointer">
            <LogoWithName />
          </NavLink>

          <div className="flex items-center gap-9 text-primary font-semibold text-lg h-full">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `py-2 cursor-pointer hover:text-secondary hover:border-b-2 hover:border-b-secondary ${isActive ? "text-secondary border-b-2 border-b-secondary" : ""
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/schedule"
              className={({ isActive }) =>
                `p-2 cursor-pointer hover:text-secondary hover:border-b-2 hover:border-b-secondary ${isActive ? "text-secondary border-b-2 border-b-secondary" : ""
                }`
              }
            >
              Schedule
            </NavLink>

            <NavLink
              to="/library"
              className={({ isActive }) =>
                `p-2 cursor-pointer hover:text-secondary hover:border-b-2 hover:border-b-secondary ${isActive ? "text-secondary border-b-2 border-b-secondary" : ""
                }`
              }
            >
              Library
            </NavLink>

            <NavLink
              to="/thread"
              className={({ isActive }) =>
                `p-2 cursor-pointer hover:text-secondary hover:border-b-2 hover:border-b-secondary ${isActive ? "text-secondary border-b-2 border-b-secondary" : ""
                }`
              }
            >
              Thread
            </NavLink>
          </div>
        </div>

        <div className="flex items-center justify-between gap-9">
          <div className="flex items-center gap-4">
            <button className="text-primary cursor-pointer p-1.5">
              <MagnifyClass className="size-6 2xl:size-8" />
            </button>
            <button className="text-primary cursor-pointer p-1.5">
              <BellIcon className="size-6 2xl:size-8" />
            </button>
            <DropdownMenu />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
