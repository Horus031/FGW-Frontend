import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { getStatsForStudents } from "../../../api/requests/attendance.api";
import { getAllCourseForStudent } from "../../../api/requests/course.api";
import type { AttendanceStats } from "../../../models/attendance";
import type { CourseState } from "../../../models/course";
import CourseCard from "../../shared/CourseAttendanceCard";
import SkeletonDemo from "../../shared/SkeletonLoading";
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

  const { data: courseListData, isFetching: courseFetching } = useQuery({
    queryKey: ["course-list", studentId],
    queryFn: () => getAllCourseForStudent(undefined, undefined, studentId),
    enabled: !!studentId,
    staleTime: 2 * 60 * 1000,
  });

  // Fetch attendance stats for all courses in one batched query so all cards
  // can render their progress circles at the same time.
  const { data: statsList } = useQuery<AttendanceStats[]>({
    queryKey: ["attendance-stats-batch", studentId, courseListData?.map((c) => c.id).join(",")],
    queryFn: async () => {
      if (!courseListData) return [] as AttendanceStats[];
      const results = await Promise.all(
        courseListData.map((c) => getStatsForStudents(studentId, c.id, c.id))
      );
      return results as AttendanceStats[];
    },
    enabled: !!studentId && !!courseListData?.length,
    staleTime: 2 * 60 * 1000,
  });

  const statsMap = useMemo(() => {
    const map: Record<string, AttendanceStats | null | undefined> = {};
    if (!courseListData) return map;

    // Pre-fill map with `null` for each course id while the batched query is loading.
    // We use `null` (explicit) to indicate "batched but not ready". The card checks for
    // `attendanceStatsProp === undefined` to decide whether to run its own per-card query.
    courseListData.forEach((c) => {
      map[c.id] = null;
    });

    if (!statsList) return map;

    courseListData.forEach((c, idx) => {
      map[c.id] = (statsList[idx] as AttendanceStats) ?? null;
    });

    return map;
  }, [courseListData, statsList]);

  const renderCourseCard = () => {
    if (!courseListData) return;

    if (courseFetching) return <SkeletonDemo skeletonNum={8} />;

    return courseListData.map((item, index) => (
      <CourseCard
        index={index}
        setCurrentCourse={setCurrentCourse}
        active={index === currentCourse.index ? true : false}
        key={item.code}
        courseInfo={item}
        // pass the batched stats (may be null while loading)
        attendanceStatsProp={statsMap[item.id]}
      />
    ));
  };

  return (
    <div className="flex">
      <div className="space-y-3 basis-5/12">{renderCourseCard()}</div>

      <AttendanceTable studentId={studentId} courseId={currentCourse.id} />
    </div>
  );
};

export default AttendanceDetails;
