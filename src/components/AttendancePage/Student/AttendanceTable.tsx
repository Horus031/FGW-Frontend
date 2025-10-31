// ...existing code...
import { useState } from "react";
import { Badge } from "../../ui/badge";
import Table, { type ColumnConfig } from "../../shared/Table";

type AttendanceStatus = "Present" | "Absent";

type StudentAttendance = {
  no: number;
  date: string; // e.g. "Wed (28 Oct)"
  slot: string | number;
  lecturer: string;
  groupName: string;
  status: AttendanceStatus;
  note: string;
};

const AttendanceTable = () => {
  const [attendanceData] = useState<StudentAttendance[]>([
    {
      no: 1,
      date: "Wed (28 Oct)",
      slot: "1",
      lecturer: "TRANLT02",
      groupName: "DESI1219.1",
      status: "Present",
      note: "",
    },
    {
      no: 2,
      date: "Wed (28 Oct)",
      slot: "1",
      lecturer: "TRANLT02",
      groupName: "DESI1219.1",
      status: "Present",
      note: "",
    },
    {
      no: 3,
      date: "Wed (28 Oct)",
      slot: "2",
      lecturer: "NGUYENV",
      groupName: "DESI1219.1",
      status: "Absent",
      note: "Sick",
    },
    {
      no: 4,
      date: "Thu (29 Oct)",
      slot: "3",
      lecturer: "TRANLT02",
      groupName: "DESI1219.1",
      status: "Present",
      note: "",
    },
    {
      no: 5,
      date: "Fri (30 Oct)",
      slot: "1",
      lecturer: "TRANLT02",
      groupName: "DESI1219.1",
      status: "Present",
      note: "",
    },
  ]);

  const renderStatusBadges = (row: StudentAttendance) => {
    return (
      <div className="flex items-center gap-2">
        <Badge
          className={`px-3 py-1 text-xs select-none font-semibold mx-auto ${
            row.status === "Present"
              ? "bg-green-100 text-green-700 border-green-700"
              : "bg-red-100 border-red-700 text-red-700"
          }`}
        >
          {row.status}
        </Badge>
      </div>
    );
  };

  const columns: ColumnConfig<StudentAttendance>[] = [
    { key: "no", title: "No.", width: "60px" },
    { key: "date", title: "Date", width: "120px" },
    { key: "slot", title: "Slot", width: "72px" },
    { key: "lecturer", title: "Lecturer", width: "120px" },
    {
      key: "groupName",
      title: "Group name",
      width: "120px",
      render: (_, row) => <span className="font-medium">{row.groupName}</span>,
    },
    {
      key: "status",
      title: <div className="w-fit mx-auto">Status</div>,
      width: "140px",
      render: (_, row) => renderStatusBadges(row),
    },
    {
      key: "note",
      title: "Note",
      width: "auto",
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
        textSize="text-sm"
        headHeight="h-12"
        bodyHeight="h-14"
        padding="px-4 py-3"
      />
    </div>
  );
};

export default AttendanceTable;
// ...existing code...
