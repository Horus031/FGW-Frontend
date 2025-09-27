import Pagination from "../shared/Pagination";
import AttendanceSlot from "./AttendanceSlot";

const AttendanceDetails = () => {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-6">
        <span className="font-semibold text-2xl text-primary">
          Module Details
        </span>

        <div className="flex p-6 gap-20 border-1 border-gray-400 w-fit rounded-lg">
          <div className="flex flex-col items-center">
            <span className="font-bold text-secondary">24</span>
            <span className="font-medium text-primary">Total slots</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-secondary">22</span>
            <span className="font-medium text-primary">Attended</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-secondary">2</span>
            <span className="font-medium text-primary">Absent</span>
          </div>
        </div>
      </div>

      <div className="grid grid-rows-6">
        <AttendanceSlot />
        <AttendanceSlot />
        <AttendanceSlot />
        <AttendanceSlot />
        <AttendanceSlot />
        <AttendanceSlot />
      </div>

      <Pagination />
    </div>
  );
};

export default AttendanceDetails;
