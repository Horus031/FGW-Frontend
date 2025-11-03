import React, { useState } from "react";
import ClassGroupCard from "../shared/ClassGroupCard";
import CourseGroupList from "../shared/CourseGroupList";
import MajorSelectCard from "../shared/MajorSelectCard";
import SharedMajorProvider, { useSharedMajor } from "../shared/SharedMajorContainer";
import Table, { type ColumnConfig } from "../shared/Table";
import { useQuery } from "@tanstack/react-query";
import { getAllClasses, getAllCourseInClass } from "../../api/requests/class.api";
import type { ClassState } from "../../models/class";
import type { CourseState } from "../../models/course";

type TimetableRow = {
  sessionNo: number;
  day: string;
  slot: string;
  room: string;
  teacher: string;
  attendanceStatus: "Attended" | "Absent" | "Pending";
};

const timetableData: TimetableRow[] = [
  { sessionNo: 1, day: "Mon 15 Oct, 2025", slot: "1", room: "F207", teacher: "TRANLT02", attendanceStatus: "Attended" },
  { sessionNo: 2, day: "Tue 16 Oct, 2025", slot: "2", room: "F208", teacher: "NGUYEN01", attendanceStatus: "Pending" },
  { sessionNo: 3, day: "Wed 17 Oct, 2025", slot: "3", room: "F209", teacher: "LETHI02", attendanceStatus: "Absent" },
];

const statusBadge = (status: TimetableRow["attendanceStatus"]) => {
  const map = {
    Attended: "bg-green-100 text-green-700 border-green-700",
    Absent: "bg-red-100 text-red-700 border-red-700",
    Pending: "bg-yellow-100 text-yellow-700 border-yellow-700",
  } as const;
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded border text-xs font-semibold ${map[status]}`}>{status}</span>
  );
};

const columns: ColumnConfig<TimetableRow>[] = [
  { key: "sessionNo", title: "Session No.", width: "95px" },
  { key: "day", title: "Day", width: "240px" },
  { key: "slot", title: "Slot", width: "80px" },
  { key: "room", title: "Room", width: "89px" },
  { key: "teacher", title: "Teacher", width: "223px" },
  { key: "attendanceStatus", title: "Attendance Status", width: "223px", render: (v) => statusBadge(v as TimetableRow["attendanceStatus"]) },
];

const TimetableInner: React.FC = () => {
  const { major, setMajor } = useSharedMajor();
  const [selectedClass, setSelectedClass] = useState<ClassState>({ index: 0, id: "", name: "" });
  const [selectedCourse, setSelectedCourse] = useState<CourseState>({ index: 0, id: "" });

  const { data: classGroupData } = useQuery({
    queryKey: ["class-group", major.programme.id, major.term.id, major.major.id],
    queryFn: () => getAllClasses(major.programme.id, major.term.id, major.major.id),
    enabled: !!major.programme.id,
  });

  const { data: courseGroupData } = useQuery({
    queryKey: ["course-group", selectedClass.id],
    queryFn: () => getAllCourseInClass(selectedClass.id),
    enabled: !!selectedClass.id,
  });

  return (
    <div className="flex flex-col gap-5.5">
      <div className="flex items-center gap-8">
        <MajorSelectCard major={major} setMajor={setMajor} />

        <ClassGroupCard
          selectedClass={selectedClass}
          setSelectedClass={setSelectedClass}
          data={classGroupData}
        />
      </div>

      <div className="flex items-start gap-6">
        <CourseGroupList
          selectedCourse={selectedCourse}
          setSelectedCourse={setSelectedCourse}
          courseGroupData={courseGroupData}
        />

        <div className="flex flex-col">
          <span className="text-sm text-gray-800 py-2">Total 24 slot</span>
          <Table columns={columns} data={timetableData} bordered padding="px-4 py-3" textSize="text-sm" centered headHeight="44px" grade />
        </div>
      </div>
    </div>
  );
};

const TimetableContainer: React.FC = () => (
  <SharedMajorProvider>
    <TimetableInner />
  </SharedMajorProvider>
);

export default TimetableContainer;
