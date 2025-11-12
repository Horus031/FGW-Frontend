// ...existing code...
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { listAttendanceRecords } from "../../../api/requests/attendance.api";
import type { AttendanceRecords } from "../../../models/attendance";
import { getSessionIndex } from "../../../utils/indexedRenderer";
import Pagination from "../../shared/Pagination";
import Table, { type ColumnConfig } from "../../shared/Table";
import { Badge } from "../../ui/badge";

type AttendanceTableProps = {
  studentId: string | undefined;
  courseId: string;
};

const AttendanceTable = (props: AttendanceTableProps) => {
  const { studentId, courseId } = props;
  const [currentPage, setCurrentPage] = useState(1);

  const { data: attendanceData } = useQuery({
    queryKey: ["attendance-records", courseId, currentPage],
    queryFn: () => listAttendanceRecords(studentId, courseId, currentPage),
    enabled: !!courseId,
  });

  const renderStatusBadges = (row: AttendanceRecords) => {
    return (
      <div className="flex items-center gap-2">
        <Badge
          className={`px-3 py-1 text-xs rounded-sm select-none font-semibold mx-auto ${row.status === "PRESENT"
              ? "bg-green-100 text-green-700 border-green-700"
              : row.status === "ABSENT"
                ? "bg-red-100 border-red-700 text-red-700"
                : "bg-gray-100 border-gray-weak text-gray-weak"
            }`}
        >
          {row.status}
        </Badge>
      </div>
    );
  };

  const columns: ColumnConfig<AttendanceRecords>[] = [
    {
      key: "id",
      title: "No.",
      width: "60px",
      render: (_value: unknown, row: AttendanceRecords): React.ReactNode => {
        // Add this above `const columns: ColumnConfig<Session>[] = [...]`
        // Replace $SELECTION_PLACEHOLDER$ with this:
        const idx = getSessionIndex(row.id, attendanceData);
        return <span>{idx >= 0 ? idx + 1 : ""}</span>;
      },
    },
    {
      key: "session",
      title: "Date",
      width: "120px",
      render: (_, row) => <span>{row.session.dateOn.toLocaleString()}</span>,
    },
    { key: "studentId", title: "Slot", width: "72px" },
    {
      key: "sessionId",
      title: "Lecturer",
      width: "120px",
      render: (_, row) => <span>{row.session.teacherId}</span>,
    },
    {
      key: "student",
      title: "Group name",
      width: "120px",
      render: (_, row) => <span className="font-medium">{row.session.class?.name}</span>,
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
    <div className="w-full overflow-x-auto flex flex-col gap-8">
      <Table
        columns={columns}
        data={attendanceData || []}
        color="bg-primary"
        textColor="text-white"
        bordered
        textSize="text-sm"
        headHeight="h-12"
        bodyHeight="h-14"
        padding="px-4 py-3"
      />

      <Pagination currentPage={currentPage} onPageChange={setCurrentPage} />
    </div>
  );
};

export default AttendanceTable;
// ...existing code...
