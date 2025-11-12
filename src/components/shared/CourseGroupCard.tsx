import type { Dispatch, SetStateAction } from "react";
import type { CourseState } from "../../models/course";

type CourseGroupProps = {
  courseId: string;
  currentIndex: number;
  courseCode: string;
  courseName: string;
  selectedCourse?: CourseState;
  setSelectedCourse?: Dispatch<SetStateAction<CourseState>>;
};

const CourseGroupCard = (props: CourseGroupProps) => {
  const { courseCode, courseName, courseId, selectedCourse, setSelectedCourse, currentIndex } =
    props;

  const handleSelectCourse = (courseId: string, index: number) => {
    if (!setSelectedCourse) return;
    setSelectedCourse((prev) => {
      return {
        ...prev,
        index: index,
        id: courseId,
      };
    });
  };
  return (
    <div
      onClick={() => handleSelectCourse(courseId, currentIndex)}
      className={`px-4 py-3 rounded-lg text-xs flex flex-col gap-4 ${selectedCourse && selectedCourse.index === currentIndex ? " border-2 border-primary bg-gray-100" : "border-1 border-gray-400"} cursor-pointer active:scale-95`}
    >
      <span className="font-semibold">{courseCode}</span>
      <span className="truncate">{courseName}</span>
    </div>
  );
};

export default CourseGroupCard;
