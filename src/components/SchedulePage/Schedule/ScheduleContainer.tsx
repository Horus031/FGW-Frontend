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

  const courseSchedules: CourseSchedule[] = [
    {
      class: "COS1204",
      courseName: "DESI1219.3",
      status: "true",
      startTime: "08:00",
      endTime: "09:30",
      dayOfWeek: 0, // Monday
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
      instructor: "SonND24",
      room: "B202"
    },
    {
      class: "COS1204",
      courseName: "Physics",
      status: "pending",
      startTime: "15:30",
      endTime: "17:00",
      dayOfWeek: 3, // Thursday
      room: "C305",
    },
  ];

  const scheduleData: ScheduleRowData[] = timeSlots.map(({ start, end }, index) => {
    const row: ScheduleRowData = {
      timeSlot: `Slot ${index + 1} ${start} - ${end}`,
    };

    daysInWeek.forEach((_, index) => {
      const dayKey = dayNames[index].toLowerCase() as keyof Omit<
        ScheduleRowData,
        "timeSlot"
      >;

      // Match course by both time slot AND day of week
      const courseForSlot = courseSchedules.find(
        (course) =>
          course.startTime === start &&
          course.endTime === end &&
          course.dayOfWeek === index
      );

      if (courseForSlot) {
        row[dayKey] = courseForSlot;
      }
    });

    return row;
  });

  const columns: ColumnConfig<ScheduleRowData>[] = [
    {
      key: "timeSlot",
      title: "Time",
      width: "88px",
    },
    ...dayNames.map((dayName) => ({
      key: dayName.toLowerCase() as keyof ScheduleRowData,
      title: dayName,
      width: "170px",
      render: (value: ScheduleRowData[keyof ScheduleRowData]) => {
        const course = value as CourseSchedule | undefined;
        return course ? (
          <div className={`flex flex-col p-2 gap-2 font-semibold rounded-lg border ${course.status === "true" ? 'border-approve' : course.status === "false" ? "border-danger" : "border-gray-500" }`}>
            <div className="flex items-center justify-between border-b border-gray-300 pb-2">
              <span className="text-secondary font-semibold">{course.class}</span>
              <Badge className={`text-[10px] rounded-sm ${course.status === "true" ? 'border-approve text-approve bg-approve/10' : course.status === "false" ? "border-danger text-danger bg-danger/10" : "border-gray-500 text-gray-500 bg-gray-500/10"}`}>{course.status === "true" ? "Attended" : course.status === 'false' ? "Absent" : "Not yet"}</Badge>
            </div>
            <span>{course.courseName}</span>
            <div className="flex items-center justify-between">
              {course.room && (
                <span className="flex items-center gap-1"><MapPin size={12}/> {course.room}</span>
              )}
              {course.instructor && (
                <span className="flex items-center gap-1"><User size={12}/> {course.instructor}</span>
              )}
            </div>
          </div>
        ) : null;
      },
    })),
  ];

  return (
    <div className="flex flex-col gap-4">
      <ScheduleSelect handleSetWeeks={handleSetWeeks} />

      <Table columns={columns} data={scheduleData} centered color="bg-primary" textColor="text-white" textSize="text-xs" height="h-[148px]" bordered/>
    </div>
  );
};

export default ScheduleContainer;
