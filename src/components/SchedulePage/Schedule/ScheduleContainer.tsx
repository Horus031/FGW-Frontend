import type { ColumnConfig } from "@/components/shared/Table";
import ScheduleSelect from "./ScheduleSelect";
import { useState } from "react";
import type { Weeks } from "@/hooks/useWeeksInYear";
import useDaysInWeek from "@/hooks/useDaysInWeek";
import { dayNames, timeSlots } from "@/constants/constants";
import Table from "@/components/shared/Table";
import { Badge } from "@/components/ui/badge";
import { MapPin, User } from "lucide-react";

type CourseSchedule = {
  class: string;
  courseName: string;
  status: "true" | "false" | "pending";
  startTime: string;
  endTime: string;
  dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  date: string; // Format: "YYYY-MM-DD" - the specific date of the course
  room?: string;
  instructor?: string;
};

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

  // Mock data - replace with API call that returns courses for the selected week
  const courseSchedules: CourseSchedule[] = [
    {
      class: "COS1204",
      courseName: "DESI1219.3",
      status: "true",
      startTime: "08:00",
      endTime: "09:30",
      dayOfWeek: 0, // Monday
      date: "2025-09-29", // Monday of first week Jan 2025
      room: "A101",
      instructor: "SonND24",
    },
    {
      class: "COS1204",
      courseName: "COMP1841",
      status: "true",
      startTime: "08:00",
      endTime: "09:30",
      dayOfWeek: 2, // Wednesday
      date: "2025-10-01", // Wednesday of first week Jan 2025
      room: "A101",
      instructor: "SonND24",
    },
    {
      class: "COS1204",
      courseName: "COMP1234",
      status: "false",
      startTime: "9:30",
      endTime: "11:00",
      dayOfWeek: 1, // Tuesday
      date: "2025-09-30", // Tuesday of first week Jan 2025
      room: "B202",
      instructor: "SonND24",
    },
    {
      class: "COS1204",
      courseName: "COMP1234",
      status: "false",
      startTime: "12:00",
      endTime: "13:30",
      dayOfWeek: 1, // Tuesday
      date: "2025-09-30", // Tuesday of first week Jan 2025
      room: "B202",
      instructor: "SonND24",
    },
    {
      class: "COS1204",
      courseName: "COMP1234",
      status: "false",
      startTime: "13:30",
      endTime: "15:00",
      dayOfWeek: 1, // Tuesday
      date: "2025-09-30", // Tuesday of first week Jan 2025
      room: "B202",
      instructor: "SonND24",
    },
    {
      class: "COS1204",
      courseName: "COMP1652",
      status: "true",
      startTime: "12:00",
      endTime: "13:30",
      dayOfWeek: 0, // Monday
      date: "2025-09-29", // Monday of first week Jan 2025
      instructor: "SonND24",
      room: "B202",
    },
    {
      class: "COS1204",
      courseName: "Physics",
      status: "pending",
      startTime: "15:30",
      endTime: "17:00",
      dayOfWeek: 3, // Thursday
      date: "2025-10-02", // Thursday of first week Jan 2025
      room: "C305",
    },
    // Example courses for a different week (second week of Jan 2025)
    {
      class: "COS1204",
      courseName: "Math 101",
      status: "true",
      startTime: "08:00",
      endTime: "09:30",
      dayOfWeek: 0, // Monday
      date: "2025-09-29", // Monday of second week Jan 2025
      room: "D401",
      instructor: "JohnD",
    },
    {
      class: "COS1204",
      courseName: "Chemistry",
      status: "true",
      startTime: "11:00",
      endTime: "12:30",
      dayOfWeek: 4, // Friday
      date: "2025-10-03", // Friday of second week Jan 2025
      room: "E501",
      instructor: "SarahK",
    },
  ];

  // Filter courses to only show those within the selected week
  const filteredCourses = weeks
    ? courseSchedules.filter((course) => {
        const courseDate = new Date(course.date);
        const weekStart = new Date(weeks.start);
        const weekEnd = new Date(weeks.end);

        // Reset time parts for accurate date comparison
        courseDate.setHours(0, 0, 0, 0);
        weekStart.setHours(0, 0, 0, 0);
        weekEnd.setHours(23, 59, 59, 999);

        return courseDate >= weekStart && courseDate <= weekEnd;
      })
    : [];

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

        // Match course by time slot, day of week, AND specific date
        const courseForSlot = filteredCourses.find((course) => {
          const courseDate = new Date(course.date);
          const currentDayDate = new Date(dayDate);

          // Reset time parts for accurate date comparison
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
              course.status === "true"
                ? "border-approve"
                : course.status === "false"
                ? "border-danger"
                : "border-gray-500"
            }`}
          >
            <div className="flex items-center justify-between border-b border-gray-300 pb-2">
              <span className="text-secondary font-semibold">
                {course.class}
              </span>
              <Badge
                className={`text-[10px] rounded-sm ${
                  course.status === "true"
                    ? "border-approve text-approve bg-approve/10"
                    : course.status === "false"
                    ? "border-danger text-danger bg-danger/10"
                    : "border-gray-500 text-gray-500 bg-gray-500/10"
                }`}
              >
                {course.status === "true"
                  ? "Attended"
                  : course.status === "false"
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
