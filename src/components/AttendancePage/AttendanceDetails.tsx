
import AttendanceSlot from "./AttendanceSlot";

const AttendanceDetails = () => {
  return (
    <div className="flex flex-col gap-12 w-3xl">
      <div className="flex flex-col gap-6">
        <span className="font-semibold text-2xl text-primary">Module Details</span>

        <div className="flex justify-between p-6 border border-gray-400 w-full rounded-lg">
          <div className="flex flex-col items-center flex-1">
            <span className="font-bold text-secondary text-3xl">24</span>
            <span className="font-medium text-primary">Total slots</span>
          </div>
          <div className="flex flex-col items-center flex-1">
            <span className="font-bold text-secondary text-3xl">22</span>
            <span className="font-medium text-primary">Attended</span>
          </div>
          <div className="flex flex-col items-center flex-1">
            <span className="font-bold text-secondary text-3xl">2</span>
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
    </div>
  );
};

export default AttendanceDetails;
