import type { CourseSchedule, ScheduleRowData } from "../../../models/course";
import useDaysInWeek from "../../../hooks/useDaysInWeek";
import { DAY_NAMES, TIME_SLOTS } from "../../../constants/constants";
import type { ColumnConfig } from "../../shared/Table";
import { Badge } from "../../ui/badge";
import { MapPin, User } from "lucide-react";
import { useWeekStore } from "../../../store/week";
import Table from "../../shared/Table";

const ScheduleContainer = () => {
  const { selectedWeek } = useWeekStore();
  const daysInWeek = useDaysInWeek(selectedWeek);

  const courseSchedules: CourseSchedule[] = [
    {
      classCode: "COS1204",
      courseName: "DESI1219.3",
      status: "present",
      startTime: "08:00",
      endTime: "09:30",
      dayOfWeek: 0,
      date: "2025-09-29",
      room: "A101",
      instructor: "SonND24",
    },
    {
      classCode: "COS1204",
      courseName: "COMP1841",
      status: "present",
      startTime: "08:00",
      endTime: "09:30",
      dayOfWeek: 2,
      date: "2025-10-01",
      room: "A101",
      instructor: "SonND24",
    },
    {
      classCode: "COS1204",
      courseName: "COMP1234",
      status: "absent",
      startTime: "9:30",
      endTime: "11:00",
      dayOfWeek: 1,
      date: "2025-09-30",
      room: "B202",
      instructor: "SonND24",
    },
    {
      classCode: "COS1204",
      courseName: "COMP1234",
      status: "absent",
      startTime: "12:00",
      endTime: "13:30",
      dayOfWeek: 1,
      date: "2025-09-30",
      room: "B202",
      instructor: "SonND24",
    },
    {
      classCode: "COS1204",
      courseName: "COMP1234",
      status: "absent",
      startTime: "13:30",
      endTime: "15:00",
      dayOfWeek: 1,
      date: "2025-09-30",
      room: "B202",
      instructor: "SonND24",
    },
    {
      classCode: "COS1204",
      courseName: "COMP1652",
      status: "present",
      startTime: "12:00",
      endTime: "13:30",
      dayOfWeek: 0,
      date: "2025-09-29",
      instructor: "SonND24",
      room: "B202",
    },
    {
      classCode: "COS1204",
      courseName: "Physics",
      status: "pending",
      startTime: "15:30",
      endTime: "17:00",
      dayOfWeek: 3,
      date: "2025-10-02",
      room: "C305",
      instructor: "SarahK",
    },
    {
      classCode: "COS1204",
      courseName: "Chemistry",
      status: "present",
      startTime: "12:00",
      endTime: "13:30",
      dayOfWeek: 4,
      date: "2025-10-03",
      room: "E501",
      instructor: "SarahK",
    },
    {
      classCode: "COS1204",
      courseName: "Chemistry",
      status: "present",
      startTime: "12:00",
      endTime: "13:30",
      dayOfWeek: 5,
      date: "2025-10-04",
      room: "E501",
      instructor: "SarahK",
    },
    {
      classCode: "COS1204",
      courseName: "Chemistry",
      status: "present",
      startTime: "12:00",
      endTime: "13:30",
      dayOfWeek: 6,
      date: "2025-10-05",
      room: "E501",
      instructor: "SarahK",
    },
  ];

  const scheduleData: ScheduleRowData[] = TIME_SLOTS.map(
    ({ start, end }, index) => {
      const row: ScheduleRowData = {
        timeSlot: `Slot ${index + 1}`,
      };

      daysInWeek.forEach((dayDate, index) => {
        const dayKey = DAY_NAMES[index].toLowerCase() as keyof Omit<
          ScheduleRowData,
          "timeSlot"
        >;

        const courseForSlot = courseSchedules.find((course) => {
          const courseDate = new Date(course.date); // Ngày course đang lặp
          const currentDayDate = new Date(dayDate); // Ngày của tuần

          courseDate.setHours(0, 0, 0, 0);
          currentDayDate.setHours(0, 0, 0, 0);

          return (
            course.startTime === start &&
            course.endTime === end &&
            course.dayOfWeek === index &&
            courseDate.getTime() === currentDayDate.getTime()
          );
        });

        if (courseForSlot) {
          row[dayKey] = courseForSlot;
        }
      });

      return row;
    }
  );

  const columns: ColumnConfig<ScheduleRowData>[] = [
    {
      key: "timeSlot",
      title: "Time",
      width: "90px",
      render: (value: ScheduleRowData[keyof ScheduleRowData]) => {
        const index = scheduleData.findIndex((row) => row.timeSlot === value);
        const { start, end } = TIME_SLOTS[index];
        return (
          <div className="lg:text-xs xl:text-sm font-medium">
            <span>{value as string}</span>
            <br />
            <span className="text-nowrap">
              {start} - {end}
            </span>
          </div>
        );
      },
    },
    ...DAY_NAMES.map((dayName, index) => ({
      key: dayName.toLowerCase() as keyof ScheduleRowData,
      title: (
        <div className="mx-auto">
          <span>{dayName}</span>
          <br />
          {daysInWeek[index]?.getDate()}
        </div>
      ),
      width: "130px",
      render: (value: ScheduleRowData[keyof ScheduleRowData]) => {
        const course = value as CourseSchedule | undefined;
        return course ? (
          <div
            className={`lg:w-full 2xl:max-w-40 lg:min-h-14 xl:min-h-20 lg:px-1 xl:px-2 flex flex-col justify-between gap-1 font-semibold rounded-sm border px-3 pb-1 py-1.5 mx-auto ${
              course.status === "present"
                ? "border-green-700 bg-green-700/10"
                : course.status === "absent"
                ? "border-danger bg-danger/10"
                : "border-gray-500 bg-gray-500/10"
            }`}
          >
            <div className="flex items-center leading-0 justify-between lg:text-[8px] xl:text-[11px]">
              <span className="text-secondary font-semibold lg:text-[10px] xl:text-[11px]">
                {course.classCode}
              </span>
              <Badge
                className={`px-1 py-0 lg:text-[8px] xl:text-[11px] font-medium rounded-sm ${
                  course.status === "present"
                    ? "border-approve text-approve bg-approve/10"
                    : course.status === "absent"
                    ? "border-danger text-danger bg-danger/10"
                    : "border-gray-500 text-gray-500 bg-gray-500/10"
                }`}
              >
                {course.status === "present"
                  ? "Attended"
                  : course.status === "absent"
                  ? "Absent"
                  : "Not yet"}
              </Badge>
            </div>
            <span className="lg:text-[10px] xl:text-xs">
              {course.courseName}
            </span>
            <div className="flex items-center justify-between lg:gap-1 xl:text-xs">
              {course.room && (
                <span className="flex items-center gap-0.5 lg:text-[8px] xl:text-xs font-normal">
                  <MapPin size={12} /> {course.room}
                </span>
              )}
              {course.instructor && (
                <span className="flex items-center gap-0.5 lg:text-[8px] xl:text-xs font-normal">
                  <User size={12} /> {course.instructor}
                </span>
              )}
            </div>
          </div>
        ) : null;
      },
    })),
  ];

  return (
    <div className="flex flex-col gap-4">

      <div className="w-full">
        <Table
          columns={columns}
          data={scheduleData}
          centered
          color="bg-primary"
          textColor="text-white"
          textSize="text-sm"
          bordered
          schedule
          activity
        />
      </div>
    </div>
  );
};

export default ScheduleContainer;
