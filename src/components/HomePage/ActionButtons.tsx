import { ArrowRight } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useUserStore } from "../../store/user";

const ActionButtons = () => {
  const { user } = useUserStore();
  return (
    <div>
      {user?.role?.name === "Student" ? (
        <div className="grid grid-cols-2 gap-6 mb-6 text-3xl">
          <NavLink
            to="/attendance"
            className="cursor-pointer h-full bg-primary text-white p-6 rounded-xl transition-colors flex items-center justify-between group col-span-2 hover:opacity-80"
          >
            <span className="font-semibold text-left">
              Attendance
              <br />
              Report
            </span>
            <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform text-white stroke-3" />
          </NavLink>

          <NavLink
            to="/mark"
            className="cursor-pointer bg-teal-400 text-gray-900 p-6 rounded-xl hover:bg-teal-500 transition-colors flex items-center justify-between group"
          >
            <span className="font-semibold text-left">
              Mark
              <br />
              Report
            </span>
            <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform stroke-3" />
          </NavLink>

          <NavLink
            to="/booking"
            className="cursor-pointer bg-teal-400 text-gray-900 p-6 rounded-xl hover:bg-teal-500 transition-colors flex items-center justify-between group"
          >
            <span className="font-semibold text-left">
              Room
              <br />
              Booking
            </span>
            <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform stroke-3" />
          </NavLink>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-6 mb-6 text-3xl">
          <NavLink
            to="/check-attendance"
            className="cursor-pointer h-25 bg-primary text-white p-6 rounded-xl transition-colors flex items-center justify-between group col-span-2 hover:opacity-80"
          >
            <span className="font-semibold text-left">Take Attendance</span>
            <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform text-white stroke-3" />
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default ActionButtons;
