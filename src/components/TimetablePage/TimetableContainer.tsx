import {
  // classGroupData,
  // courseGroupData,
  // majorData,
} from "../../constants/temp";
// import ClassGroupCard from "../shared/ClassGroupCard";
// import CourseGroupList from "../shared/CourseGroupList";
// import MajorSelectCard from "../shared/MajorSelectCard";
import Table, { type ColumnConfig } from "../shared/Table";

type TimetableRow = {
  sessionNo: number;
  day: string;
  slot: string;
  room: string;
  teacher: string;
  attendanceStatus: "Attended" | "Absent" | "Pending";
};

const timetableData: TimetableRow[] = [
  {
    sessionNo: 1,
    day: "Mon 15 Oct, 2025",
    slot: "1",
    room: "F207",
    teacher: "TRANLT02",
    attendanceStatus: "Attended",
  },
  {
    sessionNo: 1,
    day: "Mon 15 Oct, 2025",
    slot: "1",
    room: "F207",
    teacher: "TRANLT02",
    attendanceStatus: "Attended",
  },
  {
    sessionNo: 1,
    day: "Mon 15 Oct, 2025",
    slot: "1",
    room: "F207",
    teacher: "TRANLT02",
    attendanceStatus: "Pending",
  },
  {
    sessionNo: 1,
    day: "Mon 15 Oct, 2025",
    slot: "1",
    room: "F207",
    teacher: "TRANLT02",
    attendanceStatus: "Absent",
  },
  {
    sessionNo: 1,
    day: "Mon 15 Oct, 2025",
    slot: "1",
    room: "F207",
    teacher: "TRANLT02",
    attendanceStatus: "Attended",
  },
  {
    sessionNo: 1,
    day: "Mon 15 Oct, 2025",
    slot: "1",
    room: "F207",
    teacher: "TRANLT02",
    attendanceStatus: "Attended",
  },
  {
    sessionNo: 1,
    day: "Mon 15 Oct, 2025",
    slot: "1",
    room: "F207",
    teacher: "TRANLT02",
    attendanceStatus: "Pending",
  },
  {
    sessionNo: 1,
    day: "Mon 15 Oct, 2025",
    slot: "1",
    room: "F207",
    teacher: "TRANLT02",
    attendanceStatus: "Attended",
  },
  {
    sessionNo: 1,
    day: "Mon 15 Oct, 2025",
    slot: "1",
    room: "F207",
    teacher: "TRANLT02",
    attendanceStatus: "Attended",
  },
  {
    sessionNo: 1,
    day: "Mon 15 Oct, 2025",
    slot: "1",
    room: "F207",
    teacher: "TRANLT02",
    attendanceStatus: "Attended",
  },
  {
    sessionNo: 1,
    day: "Mon 15 Oct, 2025",
    slot: "1",
    room: "F207",
    teacher: "TRANLT02",
    attendanceStatus: "Attended",
  },
  {
    sessionNo: 1,
    day: "Mon 15 Oct, 2025",
    slot: "1",
    room: "F207",
    teacher: "TRANLT02",
    attendanceStatus: "Attended",
  },
  {
    sessionNo: 1,
    day: "Mon 15 Oct, 2025",
    slot: "1",
    room: "F207",
    teacher: "TRANLT02",
    attendanceStatus: "Attended",
  },
];

const TimetableContainer = () => {
  const statusBadge = (status: TimetableRow["attendanceStatus"]) => {
    const map = {
      Attended: "bg-green-100 text-green-700 border-green-700",
      Absent: "bg-red-100 text-red-700 border-red-700",
      Pending: "bg-yellow-100 text-yellow-700 border-yellow-700",
    } as const;
    return (
      <span
        className={`inline-flex items-center px-2 py-0.5 rounded border text-xs font-semibold ${map[status]}`}
      >
        {status}
      </span>
    );
  };

  const columns: ColumnConfig<TimetableRow>[] = [
    { key: "sessionNo", title: "Session No.", width: "95px" },
    { key: "day", title: "Day", width: "240px" },
    { key: "slot", title: "Slot", width: "80px" },
    { key: "room", title: "Room", width: "89px" },
    { key: "teacher", title: "Teacher", width: "223px" },
    {
      key: "attendanceStatus",
      title: "Attendance Status",
      width: "223px",
      render: (value) => statusBadge(value as TimetableRow["attendanceStatus"]),
    },
  ];

  return (
    <div className="flex flex-col gap-5.5">
      <div className="flex items-center gap-8">
        {/* <MajorSelectCard data={majorData} />

        <ClassGroupCard data={classGroupData} /> */}
      </div>

      <div className="flex items-start gap-6">
        {/* <CourseGroupList courseGroupData={courseGroupData} /> */}

        <div className="flex flex-col">
          <span className="text-sm text-gray-800 py-2">Total 24 slot</span>
          <Table
            columns={columns}
            data={timetableData}
            bordered
            padding="px-4 py-3"
            textSize="text-sm"
            centered
            headHeight="44px"
            grade
          />
        </div>
      </div>
    </div>
  );
};

export default TimetableContainer;
