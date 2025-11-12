import Table, { type ColumnConfig } from "../shared/Table";
import { Badge } from "../ui/badge";

export type AttendanceStatus = "Attend" | "Absent";

export type StudentAttendance = {
  no: number;
  avatar: string;
  studentName: string;
  studentId: string;
  status?: AttendanceStatus;
  note: string;
};

type Props = {
  selectedSlot?: number | undefined;
  attendanceData: StudentAttendance[];
  setAttendanceData: (rows: StudentAttendance[]) => void;
};

const AttendanceTable = ({ selectedSlot, attendanceData, setAttendanceData }: Props) => {
  const handleStatusChange = (studentId: string, newStatus: AttendanceStatus) => {
    const updated = attendanceData.map((student) =>
      student.studentId === studentId ? { ...student, status: newStatus } : student
    );
    setAttendanceData(updated);
  };

  const handleNoteChange = (studentId: string, newNote: string) => {
    const updated = attendanceData.map((student) =>
      student.studentId === studentId ? { ...student, note: newNote } : student
    );
    setAttendanceData(updated);
  };

  const columns: ColumnConfig<StudentAttendance>[] = [
    {
      key: "no",
      title: "No.",
      width: "60px",
    },
    {
      key: "studentName",
      title: "Member",
      width: "240px",
      render: (_, row) => (
        <div className="flex items-center gap-3">
          <img
            src={row.avatar}
            alt={row.studentName}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="font-medium">{row.studentName}</span>
        </div>
      ),
    },
    {
      key: "studentId",
      title: "Student ID",
      width: "173px",
    },
    {
      key: "status",
      title: "Status",
      width: "177px",
      render: (_, row) => {
        const slotSelected = typeof selectedSlot === "number";

        const attendClass = slotSelected
          ? row.status === "Attend"
            ? "bg-green-100 border-green-700 text-green-700"
            : "bg-gray-100 border-gray-weak hover:bg-gray-300 text-gray-weak"
          : "bg-gray-100 border-gray-weak text-gray-weak";

        const absentClass = slotSelected
          ? row.status === "Absent"
            ? "bg-red-100  text-red-700 border-red-700"
            : "bg-gray-100 border-gray-weak hover:bg-gray-300 text-gray-weak"
          : "bg-gray-100 border-gray-weak text-gray-weak";

        return (
          <div className="flex items-center gap-2 w-fit mx-auto">
            <Badge
              onClick={() => {
                if (!slotSelected) return;
                handleStatusChange(row.studentId, "Attend");
              }}
              className={`rounded-sm px-4 py-1 ${attendClass} ${slotSelected ? "cursor-pointer" : "cursor-not-allowed"}`}
            >
              Attend
            </Badge>
            <Badge
              onClick={() => {
                if (!slotSelected) return;
                handleStatusChange(row.studentId, "Absent");
              }}
              className={`rounded-sm px-3 py-1 ${absentClass} ${slotSelected ? "cursor-pointer" : "cursor-not-allowed"}`}
            >
              Absent
            </Badge>
          </div>
        );
      },
    },
    {
      key: "note",
      title: "Note",
      width: "300px",
      render: (_, row) => (
        <input
          type="text"
          value={row.note}
          onChange={(e) => handleNoteChange(row.studentId, e.target.value)}
          placeholder="Note for student..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ),
    },
  ];

  return (
    <div className="w-full overflow-x-auto">
      <Table
        columns={columns}
        data={attendanceData}
        color="bg-primary"
        textColor="text-white"
        bordered
        headHeight="h-13"
        bodyHeight="h-18"
      />
    </div>
  );
};

export default AttendanceTable;
