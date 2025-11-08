import AttendanceSearch from "./AttendanceSearch";
import AttendanceTable, { type StudentAttendance } from "./AttendanceTable";

type Props = {
  selectedSlot?: number | undefined;
  attendanceData: StudentAttendance[];
  setAttendanceData: (rows: StudentAttendance[]) => void;
  quickMarkAll: (status: "Attend" | "Absent") => void;
  copyFromPreviousSlot: () => void;
  onSave: () => void;
  timeSlotVersion?: number;
};

const AttendanceTableContainer = ({
  selectedSlot,
  attendanceData,
  setAttendanceData,
  quickMarkAll,
  copyFromPreviousSlot,
  onSave,
}: Props) => {
  return (
    <div className="flex flex-col gap-3 w-full h-full">
      <AttendanceSearch
        selectedSlot={selectedSlot}
        quickMarkAll={quickMarkAll}
        copyFromPreviousSlot={copyFromPreviousSlot}
        onSave={onSave}
      />

      <AttendanceTable
        selectedSlot={selectedSlot}
        attendanceData={attendanceData}
        setAttendanceData={setAttendanceData}
      />
    </div>
  );
};

export default AttendanceTableContainer;
