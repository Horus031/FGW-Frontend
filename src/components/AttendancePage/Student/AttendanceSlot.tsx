import type { AttendanceResponse } from "../../../models/attendance";

const AttendanceSlotDetail = ({ schedule }: AttendanceResponse) => {
  return (
    schedule.map((slot, index) => (
      <div key={index} className="flex flex-col gap-1 px-3 py-4 border-b-1 border-gray-400">
        <div className="flex justify-between text-xl font-semibold">
          <h4 className="text-primary">{slot.date}</h4>
          <span className="text-lg text-approve">{slot.status}</span>
        </div>
        <div className="flex justify-between text-lg text-gray-400 font-medium">
          <h4 className="">{slot.slot}</h4>
          <span className="">{slot.classid}</span>
        </div>
      </div>
    ))
  );
};

export default AttendanceSlotDetail;
