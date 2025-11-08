import { useState } from "react";
import AttendanceContainer from "../../../components/CheckAttendancePage/AttendanceContainer";
import AttendanceGroupList from "../../../components/CheckAttendancePage/AttendanceGroupList";
import PageTitle from "../../../components/shared/PageTitle";
import { todaysCourses } from "../../../constants/attendanceMock";

const CheckAttendancePage = () => {
  const [selectedCourseId, setSelectedCourseId] = useState<string>(todaysCourses?.[0]?.id || "");

  return (
    <div className="space-y-6">
      <PageTitle breadcrumb="Check Attendance" />

      <div className="flex flex-col gap-10">
        <AttendanceGroupList
          courses={todaysCourses}
          selectedCourseId={selectedCourseId}
          setSelectedCourseId={setSelectedCourseId}
        />

        <AttendanceContainer selectedCourseId={selectedCourseId} />
      </div>
    </div>
  );
};

export default CheckAttendancePage;
