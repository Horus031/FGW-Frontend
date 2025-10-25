import AttendanceCourseSelect from "../../../components/AttendancePage/AttendanceCourseSelect";
import AttendanceDetails from "../../../components/AttendancePage/AttendanceDetails";
import PageTitle from "../../../components/shared/PageTitle";

const AttendancePage = () => {
  return (
    <div className="space-y-4.5">
      <PageTitle
        breadcrumb="Attendance"
      />

      <div className="flex flex-row gap-8 justify-between">
        <AttendanceCourseSelect />

        <AttendanceDetails />
      </div>
    </div>
  );
};

export default AttendancePage;
