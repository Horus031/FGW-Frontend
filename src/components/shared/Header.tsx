import { useState } from "react";
import { NavLink } from "react-router-dom";
import LogoWithName from "../icons/LogoWithName";
import BellIcon from "../icons/BellIcon";
import MagnifyClass from "../icons/MagnifyClass";
import DropdownMenu from "./DropdownMenu";
// import { Input } from "../ui/input";
// import { Search } from "lucide-react";

const Header = () => {
  // const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // const toggleSearch = () => setShowSearch((prev) => !prev);
  const toggleNotifications = () => setShowNotifications((prev) => !prev);

  const notifications = [
    {
      id: 1,
      title: "Notice: Health insurance registration for 9-month period (Apr 2025 - December 2025)",
      date: "Mar 10, 2025",
      time: "10:17AM",
      isUnread: true,
    },
    {
      id: 2,
      title: "Notice: Health insurance registration for 9-month period (Apr 2025 - December 2025)",
      date: "Mar 10, 2025",
      time: "10:17AM",
    },
    {
      id: 3,
      title: "Notice: Health insurance registration for 9-month period (Apr 2025 - December 2025)",
      date: "Mar 10, 2025",
      time: "10:17AM",
    },
    {
      id: 4,
      title: "Notice: Health insurance registration for 9-month period (Apr 2025 - December 2025)",
      date: "Mar 10, 2025",
      time: "10:17AM",
    },
    {
      id: 5,
      title: "Notice: Health insurance registration for 9-month period (Apr 2025 - December 2025)",
      date: "Mar 10, 2025",
      time: "10:17AM",
    },
  ];

  return (
    <div className="fixed top-0 w-full bg-white z-40 font-public">
      {/* --- Top Navigation --- */}
      <div className="px-20 mx-auto md:max-w-screen-2xl flex items-center justify-between py-3">
        <div className="flex items-center gap-14 basis-8/12">
          <NavLink to="/" className="cursor-pointer">
            <LogoWithName />
          </NavLink>

          <div className="flex items-center gap-9 text-primary font-semibold text-lg h-full">
            {[
              { to: "/", label: "Home" },
              { to: "/schedule", label: "Schedule" },
              // { to: "/task", label: "Task Management" },
              { to: "/thread", label: "Threads" },
              { to: "/library", label: "Library" },
            ].map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `py-2 cursor-pointer hover:text-secondary hover:border-b-2 hover:border-b-secondary ${isActive
                    ? "text-secondary border-b-2 border-b-secondary"
                    : ""
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>

        {/* --- Right Section --- */}
        <div className="flex items-center justify-between gap-9 relative">
          <div className="flex items-center gap-4">
            <button
              // onClick={toggleSearch}
              className="text-primary cursor-pointer p-1.5"
            >
              <MagnifyClass className="size-6 2xl:size-8" />
            </button>
            <button
              onClick={toggleNotifications}
              className="text-primary cursor-pointer p-1.5 relative"
            >
              <BellIcon className="size-6 2xl:size-8" />
            </button>
            <DropdownMenu />
          </div>

          {/* --- Notification Dropdown --- */}
          {showNotifications && (
            <div className="absolute right-0 top-12 w-96 bg-white shadow-lg border border-gray-200 rounded-xl overflow-hidden z-60">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                <h3 className="font-semibold text-gray-800">
                  Notification (5)
                </h3>
                <button className="text-secondary text-sm font-medium hover:underline">
                  Mark all as Read
                </button>
              </div>

              <div className="max-h-96 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className="px-4 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">
                          {n.date} • {n.time}
                        </p>
                        <p
                          className={`text-sm leading-snug ${n.isUnread
                            ? "font-bold text-primary"
                            : "font-medium text-primary"
                            }`}
                        >
                          {n.title}
                        </p>
                      </div>
                      {n.isUnread && (
                        <span className="mt-1 ml-2 w-2 h-2 bg-secondary rounded-full shrink-0"></span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* --- Search Bar (toggles on click) --- */}
      {/* {showSearch && (
        <div className="py-4">
          <div className="mx-auto w-full max-w-4xl relative">
            <Search
              className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-500"
              size={24}
            />
            <Input
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-3 font-medium rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Header;
