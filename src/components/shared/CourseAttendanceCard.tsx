import { useEffect, type Dispatch, type SetStateAction } from "react";
import type { CourseGroup, CourseState } from "../../models/course";
import ProgressCircle from "./ProgressCircle";

type CourseCardProps = {
  courseInfo: CourseGroup;
  percent?: number;
  active?: boolean;
  index: number;
  setCurrentCourse: Dispatch<SetStateAction<CourseState>>;
};

const CourseCard = (props: CourseCardProps) => {
  const { percent, active, courseInfo, setCurrentCourse, index } = props;

  const handleSelectCourse = (currentIndex: number, courseId: string) => {
    setCurrentCourse((prev) => ({
      ...prev,
      index: currentIndex,
      id: courseId,
    }));
  };

  useEffect(() => {
    if (courseInfo) {
      setCurrentCourse((prev) => ({
        ...prev,
        index: index,
        id: courseInfo.id,
      }));
    } else {
      setCurrentCourse((prev) => ({
        ...prev,
        index: index,
        id: "",
      }));
    }
  }, [courseInfo, index, setCurrentCourse]);

  return (
    <div
      onClick={() => handleSelectCourse(index, courseInfo.id)}
      className={`${active ? "border-primary border-2" : "border-gray-400 border-1"} p-5 rounded-lg w-full cursor-pointer active:scale-95`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-col gap-2">
          <span className="text-base font-semibold text-primary text-nowrap">
            {courseInfo.title}
          </span>
          <div className="text-gray-400 text-sm flex flex-col gap-1">
            <span>Class: COS1204</span>
            <span>Total Slots: {courseInfo.slot}</span>
          </div>
        </div>

        {percent && <ProgressCircle percent={percent} />}
      </div>
    </div>
  );
};

export default CourseCard;
