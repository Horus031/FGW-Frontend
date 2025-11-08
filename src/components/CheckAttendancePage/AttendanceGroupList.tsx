import type { Dispatch, SetStateAction } from "react";
import type { CourseGroup } from "../../models/course";
import CourseNormalCard from "../shared/CourseNormalCard";

export type AttendanceGroupListProps = {
  courses?: CourseGroup[];
  selectedCourseId?: string;
  setSelectedCourseId?: Dispatch<SetStateAction<string>>;
};

const AttendanceGroupList = ({
  courses = [],
  selectedCourseId,
  setSelectedCourseId,
}: AttendanceGroupListProps) => {
  const renderCourseGroup = () => {
    return courses.map((item) => {
      const active = selectedCourseId === item.id;

      return (
        <CourseNormalCard
          handleActiveCard={() => setSelectedCourseId?.(item.id)}
          key={item.id}
          attendance
          active={active}
          courseCode={item.code}
          courseName={item.title}
        />
      );
    });
  };

  return <div className="flex items-center gap-3">{renderCourseGroup()}</div>;
};

export default AttendanceGroupList;
