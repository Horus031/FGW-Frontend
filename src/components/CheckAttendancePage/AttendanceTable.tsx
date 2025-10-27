import { useState } from "react";
import Table, { type ColumnConfig } from "../shared/Table";
import { Badge } from "../ui/badge";

type AttendanceStatus = "Attend" | "Absent";

type StudentAttendance = {
  no: number;
  avatar: string;
  studentName: string;
  studentId: string;
  status: AttendanceStatus;
  note: string;
};

const AttendanceTable = () => {
  const [attendanceData, setAttendanceData] = useState<StudentAttendance[]>([
    {
      no: 1,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      studentName: "John Doe",
      studentId: "STU001",
      status: "Attend",
      note: "",
    },
    {
      no: 2,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
      studentName: "Jane Smith",
      studentId: "STU002",
      status: "Attend",
      note: "",
    },
    {
      no: 3,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
      studentName: "Mike Johnson",
      studentId: "STU003",
      status: "Absent",
      note: "Sick leave",
    },
    {
      no: 4,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      studentName: "Sarah Williams",
      studentId: "STU004",
      status: "Attend",
      note: "",
    },
    {
      no: 5,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tom",
      studentName: "Tom Brown",
      studentId: "STU005",
      status: "Attend",
      note: "",
    },
  ]);

  const handleStatusChange = (index: number, newStatus: AttendanceStatus) => {
    setAttendanceData((prevData) =>
      prevData.map((student, idx) =>
        idx === index ? { ...student, status: newStatus } : student
      )
    );
  };

  const handleNoteChange = (index: number, newNote: string) => {
    setAttendanceData((prevData) =>
      prevData.map((student, idx) =>
        idx === index ? { ...student, note: newNote } : student
      )
    );
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
      render: (_, row) => (
        <div className="flex items-center gap-2 w-fit mx-auto">
          <Badge
            onClick={() =>
              handleStatusChange(
                attendanceData.findIndex((s) => s.studentId === row.studentId),
                "Attend"
              )
            }
            className={`cursor-pointer rounded-sm px-4 py-1 ${
              row.status === "Attend"
                ? "bg-green-700/10 border-green-700 text-green-700"
                : "bg-gray-100 border-gray-weak hover:bg-gray-300 text-gray-weak"
            }`}
          >
            Attend
          </Badge>
          <Badge
            onClick={() =>
              handleStatusChange(
                attendanceData.findIndex((s) => s.studentId === row.studentId),
                "Absent"
              )
            }
            className={`cursor-pointer rounded-sm px-3 py-1 ${
              row.status === "Absent"
                ? "bg-red-700/10  text-red-700 border-red-700"
                : "bg-gray-100 border-gray-weak hover:bg-gray-300 text-gray-weak"
            }`}
          >
            Absent
          </Badge>
        </div>
      ),
    },
    {
      key: "note",
      title: "Note",
      width: "300px",
      render: (_, row) => (
        <input
          type="text"
          value={row.note}
          onChange={(e) =>
            handleNoteChange(
              attendanceData.findIndex((s) => s.studentId === row.studentId),
              e.target.value
            )
          }
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