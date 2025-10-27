import AttendanceSearch from "./AttendanceSearch"
import AttendanceTable from "./AttendanceTable"

const AttendanceTableContainer = () => {
  return (
    <div className="flex flex-col gap-3 w-full h-full">
      <AttendanceSearch/>

      <AttendanceTable/>
    </div>
  )
}

export default AttendanceTableContainer
