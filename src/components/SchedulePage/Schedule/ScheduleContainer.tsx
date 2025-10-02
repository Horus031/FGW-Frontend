import type { ColumnConfig } from "@/components/shared/Table";
import ScheduleSelect from "./ScheduleSelect";
import { useState } from "react";
import type { Weeks } from "@/hooks/useWeeksInYear";
import useDaysInWeek from "@/hooks/useDaysInWeek";
import { dayNames, timeSlots } from "@/constants/constants";
import Table from "@/components/shared/Table";
import { Badge } from "@/components/ui/badge";
import { MapPin, User } from "lucide-react";
import type { CourseSchedule } from "@/models/course";



type ScheduleRowData = {
  timeSlot: string;
  monday?: CourseSchedule;
  tuesday?: CourseSchedule;
  wednesday?: CourseSchedule;
  thursday?: CourseSchedule;
  friday?: CourseSchedule;
  saturday?: CourseSchedule;
  sunday?: CourseSchedule;
};

const ScheduleContainer = () => {
  const [weeks, setWeeks] = useState<Weeks | null>(null);
  const handleSetWeeks = (weeks: Weeks | null) => {
    setWeeks(weeks);
  };

  const daysInWeek = useDaysInWeek(weeks);

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
      startTime: "11:00",
      endTime: "12:30",
      dayOfWeek: 4,
      date: "2025-10-03",
      room: "E501",
      instructor: "SarahK",
    },
  ];

  const scheduleData: ScheduleRowData[] = timeSlots.map(
    ({ start, end }, index) => {
      const row: ScheduleRowData = {
        timeSlot: `Slot ${index + 1}`,
      };

      daysInWeek.forEach((dayDate, index) => {
        const dayKey = dayNames[index].toLowerCase() as keyof Omit<
          ScheduleRowData,
          "timeSlot"
        >;

        const courseForSlot = courseSchedules.find((course) => {
          const courseDate = new Date(course.date);
          const currentDayDate = new Date(dayDate);

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
      width: "120px",
      render: (value: ScheduleRowData[keyof ScheduleRowData]) => {
        const index = scheduleData.findIndex((row) => row.timeSlot === value);
        const { start, end } = timeSlots[index];
        return (
          <div>
            {value as string}
            <br />
            {start} - {end}
          </div>
        );
      },
    },
    ...dayNames.map((dayName, index) => ({
      key: dayName.toLowerCase() as keyof ScheduleRowData,
      title: (
        <div>
          <span>{dayName}</span>
          <br />
          {daysInWeek[index]?.getDate()}
        </div>
      ),
      width: "170px",
      render: (value: ScheduleRowData[keyof ScheduleRowData]) => {
        const course = value as CourseSchedule | undefined;
        return course ? (
          <div
            className={`flex flex-col p-2 gap-2 font-semibold rounded-lg border ${
              course.status === "present"
                ? "border-approve"
                : course.status === "absent"
                ? "border-danger"
                : "border-gray-500"
            }`}
          >
            <div className="flex items-center justify-between border-b border-gray-300 pb-2">
              <span className="text-secondary font-semibold">
                {course.classCode}
              </span>
              <Badge
                className={`text-[10px] rounded-sm ${
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
            <span>{course.courseName}</span>
            <div className="flex items-center justify-between">
              {course.room && (
                <span className="flex items-center gap-1">
                  <MapPin size={12} /> {course.room}
                </span>
              )}
              {course.instructor && (
                <span className="flex items-center gap-1">
                  <User size={12} /> {course.instructor}
                </span>
              )}
            </div>
          </div>
        ) : null;
      },
    })),
  ];

  console.log(daysInWeek);

  return (
    <div className="flex flex-col gap-4">
      <ScheduleSelect handleSetWeeks={handleSetWeeks} />

      <Table
        columns={columns}
        data={scheduleData}
        centered
        color="bg-primary"
        textColor="text-white"
        textSize="text-xs"
        height="h-[148px]"
        bordered
      />
    </div>
  );
};

export default ScheduleContainer;
