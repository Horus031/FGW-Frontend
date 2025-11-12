import { useEffect, type Dispatch, type SetStateAction } from "react";
import type { CourseGroup, CourseState } from "../../models/course";
import TimeSlotCard from "../CheckAttendancePage/TimeSlotCard";
import CourseGroupCard from "./CourseGroupCard";

export type CourseGroupProps = {
  isAttendance?: boolean;
  courseGroupData?: CourseGroup[];
  timeSlotData?: {
    className: string;
    timeSlotGroup: {
      slot: number;
      startTime: string;
      endTime: string;
      status: string;
    }[];
  };
  selectedCourse?: CourseState;
  setSelectedCourse?: Dispatch<SetStateAction<CourseState>>;
  // selected slot number when in attendance mode
  selectedSlot?: number | undefined;
  setSelectedSlot?: Dispatch<SetStateAction<number | undefined>>;
};

const CourseGroupList = (props: CourseGroupProps) => {
  const {
    courseGroupData,
    isAttendance,
    timeSlotData,
    selectedCourse,
    setSelectedCourse,
    selectedSlot,
    setSelectedSlot,
  } = props;

  useEffect(() => {
    if (!setSelectedCourse) return;

    if (courseGroupData && courseGroupData.length > 0) {
      setSelectedCourse((prev) => {
        return {
          ...prev,
          index: 0,
          id: courseGroupData[0].id,
        };
      });
    } else {
      setSelectedCourse((prev) => {
        return {
          ...prev,
          index: 0,
          id: "",
        };
      });
    }
  }, [courseGroupData, setSelectedCourse]);

  // NOTE: slot selection is managed by the parent container (`AttendanceContainer`).

  const renderCourseGroup = () => {
    return courseGroupData?.map((item, index) => {
      return (
        <CourseGroupCard
          key={item.code}
          currentIndex={index}
          courseId={item.id}
          courseCode={item.code}
          courseName={item.title}
          selectedCourse={selectedCourse}
          setSelectedCourse={setSelectedCourse}
        />
      );
    });
  };

  const renderTimeSlot = () => {
    return timeSlotData?.timeSlotGroup.map((item) => {
      return (
        <TimeSlotCard
          key={item.slot}
          slot={item.slot}
          startTime={item.startTime}
          endTime={item.endTime}
          status={item.status}
          active={selectedSlot === item.slot}
          onClick={() => setSelectedSlot?.(item.slot)}
        />
      );
    });
  };

  return (
    <div className="p-4 border-1 border-gray-300 flex flex-col gap-4 text-primary rounded-lg h-fit lg:basis-3/12 2xl:basis-4/12">
      <div className="flex items-center justify-between">
        <span className="font-semibold text-sm">{timeSlotData?.className || "Course"}</span>
        {isAttendance && <span className="font-semibold text-sm text-secondary">16 Oct, 2025</span>}
      </div>
      {isAttendance ? renderTimeSlot() : renderCourseGroup()}
    </div>
  );
};

export default CourseGroupList;
