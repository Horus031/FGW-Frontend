import { useState } from "react";
import Table, { type ColumnConfig } from "../shared/Table";
import { Badge } from "../ui/badge";

type AttendStatus = "Attended" | "Absent" | "Pending";

type SlotAttendance = {
  startDate: string;
  slot: number;
  room: string;
  course: string;
  sectionNo: number;
  group: string;
  attend: AttendStatus;
};

const MainSummaryTable = () => {
  const [slotData] = useState<SlotAttendance[]>([
    {
      startDate: "12 Aug, 2025",
      slot: 1,
      room: "F201",
      course: "Study Skill for University Success",
      sectionNo: 5,
      group: "AEG116_OJT4",
      attend: "Attended",
    },
    {
      startDate: "12 Aug, 2025",
      slot: 1,
      room: "F201",
      course: "Study Skill for University Success",
      sectionNo: 5,
      group: "AEG116_OJT4",
      attend: "Attended",
    },
    {
      startDate: "12 Aug, 2025",
      slot: 1,
      room: "F201",
      course: "Study Skill for University Success",
      sectionNo: 5,
      group: "AEG116_OJT4",
      attend: "Pending",
    },
    {
      startDate: "12 Aug, 2025",
      slot: 1,
      room: "F201",
      course: "Study Skill for University Success",
      sectionNo: 5,
      group: "AEG116_OJT4",
      attend: "Attended",
    },
    {
      startDate: "12 Aug, 2025",
      slot: 1,
      room: "F201",
      course: "Study Skill for University Success",
      sectionNo: 5,
      group: "AEG116_OJT4",
      attend: "Absent",
    },
    {
      startDate: "12 Aug, 2025",
      slot: 1,
      room: "F201",
      course: "Study Skill for University Success",
      sectionNo: 5,
      group: "AEG116_OJT4",
      attend: "Attended",
    },
    {
      startDate: "12 Aug, 2025",
      slot: 1,
      room: "F201",
      course: "Study Skill for University Success",
      sectionNo: 5,
      group: "AEG116_OJT4",
      attend: "Attended",
    },
    {
      startDate: "12 Aug, 2025",
      slot: 1,
      room: "F201",
      course: "Study Skill for University Success",
      sectionNo: 5,
      group: "AEG116_OJT4",
      attend: "Pending",
    },
    {
      startDate: "12 Aug, 2025",
      slot: 1,
      room: "F201",
      course: "Study Skill for University Success",
      sectionNo: 5,
      group: "AEG116_OJT4",
      attend: "Attended",
    },
    {
      startDate: "12 Aug, 2025",
      slot: 1,
      room: "F201",
      course: "Study Skill for University Success",
      sectionNo: 5,
      group: "AEG116_OJT4",
      attend: "Attended",
    },
  ]);

  const renderAttendBadge = (status: AttendStatus) => {
    const statusMap = {
      Attended: "bg-green-100 text-green-700 border-green-700",
      Absent: "bg-red-100 text-red-700 border-red-700",
      Pending: "bg-yellow-100 text-yellow-700 border-yellow-700",
    };

    return (
      <div className="w-fit mx-auto">
        <Badge
          className={`${statusMap[status]} border px-3 py-1 text-xs font-semibold`}
        >
          {status}
        </Badge>
      </div>
    );
  };

  const columns: ColumnConfig<SlotAttendance>[] = [
    {
      key: "startDate",
      title: "Start Date",
      width: "120px",
    },
    {
      key: "slot",
      title: "Slot",
      width: "80px",
    },
    {
      key: "room",
      title: "Room",
      width: "220px",
    },
    {
      key: "course",
      title: "Course",
      width: "420px",
    },
    {
      key: "sectionNo",
      title: "Section No",
      width: "120px",
    },
    {
      key: "group",
      title: "Group",
      width: "160px",
    },
    {
      key: "attend",
      title: "Attend",
      width: "160px",
      render: (value) => renderAttendBadge(value as AttendStatus),
    },
  ];

  return (
    <div className="w-full overflow-x-auto">
      <Table
        columns={columns}
        data={slotData}
        color="bg-primary"
        textColor="text-white"
        bordered
        textSize="text-sm"
        headHeight="h-14"
        bodyHeight="h-14"
        padding="px-4 py-3"
        grade
      />
    </div>
  );
};

export default MainSummaryTable;
