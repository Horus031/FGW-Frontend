import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  getAllClasses,
  getAllCourseInClass,
  listSessionOfClass,
} from "../../api/requests/class.api";
import type { ClassState } from "../../models/class";
import type { CourseState } from "../../models/course";
import type { Session } from "../../models/session";
import { formatDate } from "../../utils/formatDate";
import { getSessionIndex } from "../../utils/indexedRenderer";
import ClassGroupCard from "../shared/ClassGroupCard";
import CourseGroupList from "../shared/CourseGroupList";
import MajorSelectCard from "../shared/MajorSelectCard";
import SharedMajorProvider, { useSharedMajor } from "../shared/SharedMajorContainer";
import Table, { type ColumnConfig } from "../shared/Table";

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

  const { data: timetableData } = useQuery({
    queryKey: ["session-list", selectedClass.id, selectedCourse.id],
    queryFn: () => listSessionOfClass(selectedClass.id, selectedCourse.id),
    enabled: !!selectedClass.id && !!selectedCourse.id,
  });

  const columns: ColumnConfig<Session>[] = [
    {
      key: "id",
      title: <span className="whitespace-nowrap">Session No</span>,
      width: "106px",
      render: (_value: unknown, row: Session): React.ReactNode => {
        // Add this above `const columns: ColumnConfig<Session>[] = [...]`
        // Replace $SELECTION_PLACEHOLDER$ with this:
        const idx = getSessionIndex(row.id, timetableData);
        return <span>{idx >= 0 ? idx + 1 : ""}</span>;
      },
    },
    {
      key: "dateOn",
      title: "Day",
      width: "240px",
      render: (_, row) => {
        return <span>{formatDate(row.dateOn)}</span>;
      },
    },
    { key: "courseId", title: "Slot", width: "80px" },
    {
      key: "room",
      title: "Room",
      width: "89px",
      render: (_, row) => <span>{row.room?.code}</span>,
    },
    {
      key: "teacherId",
      title: "Teacher",
      width: "120px",
      render: (_, row) => <span>{row.teacher?.staffCode}</span>,
    },
  ];

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
          isTimetable
          selectedCourse={selectedCourse}
          setSelectedCourse={setSelectedCourse}
          courseGroupData={courseGroupData}
        />

        <div className="flex flex-col w-full">
          <span className="text-sm text-gray-800 py-2">Total 24 slot</span>
          <Table
            columns={columns}
            data={timetableData || []}
            bordered
            padding="px-4 py-3"
            textSize="text-sm"
            headHeight="44px"
            grade
          />
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
