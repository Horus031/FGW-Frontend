import AttendanceContainer from "../../../components/CheckAttendancePage/AttendanceContainer"
import AttendanceGroupList from "../../../components/CheckAttendancePage/AttendanceGroupList"
import PageTitle from "../../../components/shared/PageTitle"

const CheckAttendancePage = () => {
  return (
    <div className="space-y-6">
      <PageTitle breadcrumb="Check Attendance"/>

      <div className="flex flex-col gap-10">
        <AttendanceGroupList/>

        <AttendanceContainer/>
      </div>
    </div>
  )
}

export default CheckAttendancePage
