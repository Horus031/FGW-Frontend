import TimeSlotCard from "../CheckAttendancePage/TimeSlotCard";
import CourseGroupCard from "./CourseGroupCard";

export type CourseGroupProps = {
  isAttendance?: boolean;
  courseGroupData?: {
    className: string;
    courseGroup: {
      courseCode: string;
      courseName: string;
    }[];
  };
  timeSlotData?: {
    className: string;
    timeSlotGroup: {
      slot: number;
      startTime: string;
      endTime: string;
      status: string;
    }[];
  };
};

const CourseGroupList = (props: CourseGroupProps) => {
  const { courseGroupData, isAttendance, timeSlotData } = props;

  const renderCourseGroup = () => {
    return courseGroupData?.courseGroup.map((item) => {
      return (
        <CourseGroupCard
          key={item.courseCode}
          courseCode={item.courseCode}
          courseName={item.courseName}
        />
      );
    });
  };

  const renderTimeSlot = () => {
    return timeSlotData?.timeSlotGroup.map((item) => {
      return <TimeSlotCard key={item.slot} slot={item.slot} startTime={item.startTime} endTime={item.endTime} status={item.status}  />;
    });
  };

  return (
    <div className="p-4 border-1 border-gray-300 flex flex-col gap-4 text-primary rounded-lg h-fit lg:basis-3/12 2xl:basis-4/12">
      <div className="flex items-center justify-between">
        <span className="font-semibold text-sm">
          {courseGroupData?.className || timeSlotData?.className}
        </span>

        {isAttendance && (
          <span className="font-semibold text-sm text-secondary">16 Oct, 2025</span>
        )}
      </div>
      {isAttendance ? renderTimeSlot() : renderCourseGroup()}
    </div>
  );
};

export default CourseGroupList;
