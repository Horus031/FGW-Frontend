import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getAllCourseForStudent } from "../../../api/requests/course.api";
import type { CourseState } from "../../../models/course";
import CourseCard from "../../shared/CourseAttendanceCard";
import AttendanceTable from "./AttendanceTable";

type AttendanceDetailsProps = {
  studentId: string | undefined;
};

const defaultState: CourseState = {
  index: 0,
  id: "",
};

const AttendanceDetails = (props: AttendanceDetailsProps) => {
  const { studentId } = props;
  const [currentCourse, setCurrentCourse] = useState(defaultState);

  const { data: courseListData } = useQuery({
    queryKey: ["course-list", studentId],
    queryFn: () => getAllCourseForStudent(undefined, undefined, studentId),
    enabled: !!studentId,
    staleTime: 2 * 60 * 1000,
  });

  const renderCourseCard = () => {
    if (!courseListData) return;

    return courseListData.map((item, index) => (
      <CourseCard
        index={index}
        setCurrentCourse={setCurrentCourse}
        active={index === currentCourse.index ? true : false}
        key={item.code}
        courseInfo={item}
      />
    ));
  };

  return (
    <div className="flex gap-8.5">
      <div className="space-y-3">{renderCourseCard()}</div>

      <AttendanceTable studentId={studentId} courseId={currentCourse.id} />
    </div>
  );
};

export default AttendanceDetails;
