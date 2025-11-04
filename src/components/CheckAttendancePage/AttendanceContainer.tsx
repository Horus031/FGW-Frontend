// import CourseGroupList from "../shared/CourseGroupList";
import AttendanceTableContainer from "./AttendanceTableContainer";

// const data = {
//   className: "DESI1219.1",
//   timeSlotGroup: [
//     {
//       slot: 1,
//       startTime: "08:00",
//       endTime: "09:30",
//       status: "Completed",
//     },
//     {
//       slot: 2,
//       startTime: "08:00",
//       endTime: "09:30",
//       status: "Pending",
//     },
//     {
//       slot: 3,
//       startTime: "08:00",
//       endTime: "09:30",
//       status: "Pending",
//     },
//   ],
// };

const AttendanceContainer = () => {
  return (
    <div className="flex gap-6">
      {/* <CourseGroupList timeSlotData={data} isAttendance /> */}

      <AttendanceTableContainer/>
    </div>
  );
};

export default AttendanceContainer;
