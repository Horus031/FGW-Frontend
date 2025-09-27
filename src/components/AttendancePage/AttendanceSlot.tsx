
const AttendanceSlot = () => {
  return (
    <div className="flex flex-col gap-1 px-3 py-4 border-b-1 border-gray-400">
      <div className="flex justify-between text-xl font-semibold">
        <h4 className="text-primary">Thu - Jan 09, 2024</h4>
        <span className="text-lg text-approve">Present</span>
      </div>
      <div className="flex justify-between text-lg text-gray-400 font-medium">
        <h4 className="">Slot 4</h4>
        <span className="">TDS1502</span>
      </div>
    </div>
  );
};

export default AttendanceSlot;
