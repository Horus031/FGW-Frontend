import { useQuery } from "@tanstack/react-query";
import { useEffect, type Dispatch, type SetStateAction } from "react";
import { getStatsForStudents } from "../../api/requests/attendance.api";
import type { AttendanceStats } from "../../models/attendance";
import type { CourseGroup, CourseState } from "../../models/course";
import { useUserStore } from "../../store/user";
import ProgressCircle from "./ProgressCircle";

type CourseCardProps = {
  courseInfo: CourseGroup;
  active?: boolean;
  index: number;
  setCurrentCourse: Dispatch<SetStateAction<CourseState>>;
  attendanceStatsProp?: AttendanceStats | AttendanceStats[] | null;
};

const CourseCard = (props: CourseCardProps) => {
  const { user } = useUserStore();
  const { active, courseInfo, setCurrentCourse, index } = props;

  // If parent provided attendance stats (batched), use them. Otherwise fall back to per-card query.
  const { data: attendanceStats } = useQuery({
    queryKey: ["attendance-stats", user?.student?.id, courseInfo.id],
    queryFn: () => getStatsForStudents(user?.student?.id, courseInfo.id, courseInfo.id),
    enabled: typeof props.attendanceStatsProp === "undefined",
  });

  // If parent passed the prop (could be null while batching), use it and do NOT fall
  // back to the per-card query. Only fall back when the prop is literally undefined.
  const attendanceRaw =
    props.attendanceStatsProp !== undefined ? props.attendanceStatsProp : attendanceStats;
  const normalizedStats = Array.isArray(attendanceRaw) ? attendanceRaw[0] : attendanceRaw;

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

        {normalizedStats && <ProgressCircle percent={normalizedStats.attendanceRate} />}
      </div>
    </div>
  );
};

export default CourseCard;
