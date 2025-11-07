import AttendanceCourseSelect from "../../../components/AttendancePage/Student/AttendanceCourseSelect";
import AttendanceDetails from "../../../components/AttendancePage/Student/AttendanceDetails";
import AttendanceContainer from "../../../components/AttendancePage/Teacher/AttendanceContainer";
import PageTitle from "../../../components/shared/PageTitle";
import { useUserStore } from "../../../store/user";

const AttendancePage = () => {
  const { user } = useUserStore();

  return (
    <div className="space-y-6">
      <PageTitle breadcrumb="Attendance Report" />

      {user?.role.name === "Student" ? (
        <div className="space-y-6">
          <AttendanceCourseSelect />
          <AttendanceDetails studentId={user.student?.id} />
        </div>
      ) : (
        <AttendanceContainer />
      )}
    </div>
  );
};

export default AttendancePage;
