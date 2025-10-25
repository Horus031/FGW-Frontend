import AttendanceCourseSelect from "../../../components/AttendancePage/Student/AttendanceCourseSelect";
import AttendanceDetails from "../../../components/AttendancePage/Student/AttendanceDetails";
import AttendanceContainer from "../../../components/AttendancePage/Teacher/AttendanceContainer";
import PageTitle from "../../../components/shared/PageTitle";

const AttendancePage = () => {
  const role = localStorage.getItem("role");

  return (
    <div className="space-y-6">
      <PageTitle breadcrumb="Attendance Report" />

      {role === "Student" ? (
        <div className="flex flex-row gap-8 justify-between">
          <AttendanceCourseSelect />

          <AttendanceDetails />
        </div>
      ) : (
        <AttendanceContainer/>
      )}
    </div>
  );
};

export default AttendancePage;
