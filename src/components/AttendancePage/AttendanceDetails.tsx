import AttendanceSlotDetail from "./AttendanceSlot";
import type { AttendanceSlot } from "../../models/attendance";
import Pagination from "../shared/Pagination";



const data: AttendanceSlot[] = [
  {
    date: "Thu - Jan 09, 2024", status: "present", slot: "Slot 4", code: "TDS1502",
  },
  {
    date: "Wed - Jan 08, 2024", status: "absent", slot: "Slot 3", code: "TDS1502",
  },
  {
    date: "Tue - Jan 07, 2024", status: "present", slot: "Slot 2", code: "TDS1502",
  },
  {
    date: "Mon - Jan 06, 2024", status: "present", slot: "Slot 1", code: "TDS1502",
  },
  {
    date: "Mon - Jan 06, 2024", status: "present", slot: "Slot 1", code: "TDS1502",
  },
];

const AttendanceDetails = () => {
  return (
    <div className="flex flex-col gap-6 w-3xl">
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


      <div className="flex flex-col overflow-y-hidden max-h-[500px]">
        <AttendanceSlotDetail data={data} />
      </div>

      <Pagination/>

    </div>
  );
};

export default AttendanceDetails;
