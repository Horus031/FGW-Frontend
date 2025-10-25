import type { AttendanceSlotProps } from "../../../models/attendance";

const AttendanceSlotDetail = ({ data }: AttendanceSlotProps) => {
  return (
    data.map((item, index) => (
      <div key={index} className="flex flex-col gap-1 px-3 py-4 border-b-1 border-gray-400">
        <div className="flex justify-between text-xl font-semibold">
          <h4 className="text-primary">{item.date}</h4>
          <span className="text-lg text-approve">{item.status}</span>
        </div>
        <div className="flex justify-between text-lg text-gray-400 font-medium">
          <h4 className="">{item.slot}</h4>
          <span className="">{item.code}</span>
        </div>
      </div>
    ))
  );
};

export default AttendanceSlotDetail;
