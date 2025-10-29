import CourseCard from "../../shared/CourseAttendanceCard";
import AttendanceTable from "./AttendanceTable";

const AttendanceDetails = () => {
  return (
    <div className="flex gap-8.5">
      <div className="space-y-3">
        <CourseCard percent={30} active />
        <CourseCard percent={30} />
        <CourseCard percent={30} />
      </div>

      <AttendanceTable/>
    </div>
  );
};

export default AttendanceDetails;
