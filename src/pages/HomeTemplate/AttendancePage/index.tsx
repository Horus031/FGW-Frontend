import AttendanceCourseSelect from "../../../components/AttendancePage/AttendanceCourseSelect";
import AttendanceDetails from "../../../components/AttendancePage/AttendanceDetails";
import PageTitle from "../../../components/shared/PageTitle";

const AttendancePage = () => {
  return (
    <div className="space-y-12">
      <PageTitle
        title="Attendance Report"
        breadcrumb="Attendance"
        subtitle="Check your attendance progress"
      />

      <div className="flex flex-col gap-8">
        <AttendanceCourseSelect />

        <AttendanceDetails />
      </div>
    </div>
  );
};

export default AttendancePage;
