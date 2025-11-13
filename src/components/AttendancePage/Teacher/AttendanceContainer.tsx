import { useQuery } from "@tanstack/react-query";
import { Info } from "lucide-react";
import { useState } from "react";
import { getStatsForStudents } from "../../../api/requests/attendance.api";
import { getAllClasses, getAllCourseInClass } from "../../../api/requests/class.api";
import type { AttendanceStats } from "../../../models/attendance";
import type { ClassState } from "../../../models/class";
import type { CourseState } from "../../../models/course";
import type { MajorState } from "../../../models/major";
import ClassGroupCard from "../../shared/ClassGroupCard";
import CourseGroupList from "../../shared/CourseGroupList";
import MajorSelectCard from "../../shared/MajorSelectCard";
import SharedMajorProvider, { useSharedMajor } from "../../shared/SharedMajorContainer";
import type { ColumnConfig } from "../../shared/Table";
import Table from "../../shared/Table";

const defaultMajor: MajorState = {
  programme: { index: 0, id: 1 },
  year: { index: 0, academicYear: "" },
  term: { index: 0, id: 0 },
  semester: { index: 0, code: "" },
  major: { index: 0, id: 0 },
};

const defaultClass: ClassState = {
  index: 0,
  id: "",
  name: "",
};

const defaultCourse: CourseState = {
  index: 0,
  id: "",
};

const AttendanceInner = () => {
  const { major, setMajor } = useSharedMajor();

  // const handleInfo = useCallback((row: AttendanceStats) => {
  //   // TODO: open modal/side-panel with details
  //   console.log("Info clicked for:", row.studentId, row.studentName);
  // }, []);

  // keep UI selection state local (class & course)
  const [selectedClass, setSelectedClass] = useState<ClassState>(defaultClass);
  const [selectedCourse, setSelectedCourse] = useState<CourseState>(defaultCourse);

  const columns: ColumnConfig<AttendanceStats>[] = [
    { key: "studentCode", title: "ID", width: "300px" },
    { key: "studentName", title: "Student Name", width: "300px" },
    {
      key: "attendanceRate",
      title: "Absent (%) so far",
      width: "300px",
      render: (_, row) => <span className="font-medium">{row.attendanceRate}%</span>,
    },
    {
      key: "info",
      title: "Info",
      width: "60px",
      render: () => (
        <div className="mx-auto w-fit cursor-pointer hover:bg-gray-200 p-2 rounded-full active:scale-95">
          <Info size={20} />
        </div>
      ),
    },
  ];

  // class/course queries use the shared `major`
  const { data: classGroupData } = useQuery({
    queryKey: ["class-group", major.programme.id, major.term.id, major.major.id],
    queryFn: () => getAllClasses(major.programme.id, major.term.id, major.major.id),
    enabled: !!major.programme.id,
    staleTime: 2 * 60 * 1000,
  });

  const { data: courseGroupData } = useQuery({
    queryKey: ["course-group", selectedClass.id],
    queryFn: () => getAllCourseInClass(selectedClass.id),
    enabled: !!selectedClass.id,
    staleTime: 2 * 60 * 1000,
  });

  const { data: attendanceStatsData } = useQuery({
    queryKey: ["attendance-stats", selectedCourse.id],
    queryFn: () => getStatsForStudents(undefined, selectedCourse.id, selectedClass.id),
    enabled: !!selectedCourse.id,
    staleTime: 2 * 60 * 1000,
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

      <div className="flex items-start justify-between gap-6">
        <CourseGroupList
          selectedCourse={selectedCourse}
          setSelectedCourse={setSelectedCourse}
          courseGroupData={courseGroupData}
        />

        <div className="flex flex-col">
          <span className="text-sm text-gray-800 py-2">Total 24 slot</span>
          <Table
            columns={columns}
            data={
              Array.isArray(attendanceStatsData)
                ? attendanceStatsData
                : attendanceStatsData
                  ? [attendanceStatsData]
                  : []
            }
            bordered
            padding="px-4 py-3"
            textSize="text-sm"
            grade
            headHeight="h-10"
            bodyHeight="h-4"
          />
        </div>
      </div>
    </div>
  );
};

const AttendanceContainer = () => {
  return (
    <SharedMajorProvider initialMajor={defaultMajor}>
      <AttendanceInner />
    </SharedMajorProvider>
  );
};

export default AttendanceContainer;
