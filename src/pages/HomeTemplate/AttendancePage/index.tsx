import AttendanceCourseSelect from "../../../components/AttendancePage/Student/AttendanceCourseSelect";
import AttendanceDetails from "../../../components/AttendancePage/Student/AttendanceDetails";
import AttendanceContainer from "../../../components/AttendancePage/Teacher/AttendanceContainer";
import PageTitle from "../../../components/shared/PageTitle";
import { useUserStore } from "../../../store/user";

const AttendancePage = () => {
  const role = useUserStore((state) => state.user?.role.name);


  return (
    <div className="space-y-6">
      <PageTitle breadcrumb="Attendance Report" />

      {role === "Student" ? (
        <div className="space-y-6">
          <AttendanceCourseSelect />

          <AttendanceDetails />
        </div>
      ) : (
        <AttendanceContainer />
      )}
    </div>
  );
};

export default AttendancePage;
