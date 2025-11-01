import type { CourseSchedule, ScheduleRowData } from "../../../models/course";
import useDaysInWeek from "../../../hooks/useDaysInWeek";
import { DAY_NAMES, TIME_SLOTS } from "../../../constants/constants";
import type { ColumnConfig } from "../../shared/Table";
import { Badge } from "../../ui/badge";
import { MapPin, User } from "lucide-react";
import { useWeekStore } from "../../../store/week";
import Table from "../../shared/Table";
import type { AttendanceSlot } from "../../../models/attendance";


const ScheduleContainer = ({
  schedule,
  loading
}: {
  schedule: AttendanceSlot[];
  loading?: boolean;
}) => {
  const { selectedWeek } = useWeekStore();
  const daysInWeek = useDaysInWeek(selectedWeek);

  // console.log('📅 ScheduleContainer render', {
  //   selectedWeek,
  //   scheduleLength: schedule?.length || 0,
  //   schedule: schedule,
  //   daysInWeek
  // });

  // if (!schedule || schedule.length === 0) {
  //   return (
  //     <div className="flex flex-col gap-4">
  //       <div className="w-full text-center py-8 text-gray-500">
  //         No classes scheduled for this week
  //       </div>
  //     </div>
  //   );
  // }

  // ✅ Helper function to normalize time format from HH:mm:ss to HH:mm
  const normalizeTime = (time: string | undefined): string => {
    if (!time) return "";
    // If time is "07:30:00", return "07:30"
    // If time is already "07:30", return as is
    return time.substring(0, 5);
  };

  const scheduleData: ScheduleRowData[] = TIME_SLOTS.map(
    ({ start, end }, slotIndex) => {
      const row: ScheduleRowData = {
        timeSlot: `Slot ${slotIndex + 1}`,
      };

      daysInWeek.forEach((dayDate, dayIndex) => {
        const dayKey = DAY_NAMES[dayIndex].toLowerCase() as keyof Omit<ScheduleRowData, "timeSlot">;


        const courseForSlot = schedule.find((slot) => {
          if (!slot.date) return false;

          // ✅ Parse the date string from API (assuming format like "2025-10-28")
          const courseDateStr = slot.date.split('T')[0]; // Handle ISO format
          const courseDate = new Date(courseDateStr + 'T00:00:00'); // Force local timezone

          const currentDayDate = new Date(dayDate);
          currentDayDate.setHours(0, 0, 0, 0);

          const dateMatch = courseDate.getTime() === currentDayDate.getTime();

          // ✅ Convert API day numbering (0=Sunday) to your system (0=Monday)
          // If API uses 0=Sunday: Sunday=0, Monday=1, Tuesday=2, etc.
          // Your system: Monday=0, Tuesday=1, Wednesday=2, etc.
          const apiDay = slot.day ?? -1;
          const adjustedDay = apiDay === 0 ? 6 : apiDay - 1; // Convert Sunday=0 to Sunday=6, and shift others down
          const dayMatch = adjustedDay === dayIndex;

          // ✅ Normalize time formats for comparison
          const normalizedSlotStart = normalizeTime(slot.slotStartTime);
          const normalizedSlotEnd = normalizeTime(slot.slotEndTime);
          const timeMatch = normalizedSlotStart === start && normalizedSlotEnd === end;

          // Debug logging for first slot only
          // if (slotIndex === 0 && dayIndex === 0) {
          //   console.log('🔍 Checking first slot:', {
          //     slot,
          //     courseDateStr,
          //     courseDate: courseDate.toDateString(),
          //     currentDayDate: currentDayDate.toDateString(),
          //     dateMatch,
          //     apiDay,
          //     adjustedDay,
          //     dayIndex,
          //     dayMatch,
          //     normalizedSlotStart,
          //     normalizedSlotEnd,
          //     start,
          //     end,
          //     timeMatch,
          //     allMatch: dateMatch && dayMatch && timeMatch
          //   });
          // }

          return dateMatch && dayMatch && timeMatch;
        });

        if (courseForSlot) {
          // console.log('✅ Found course for slot:', {
          //   dayKey,
          //   slotIndex,
          //   course: courseForSlot
          // });

          row[dayKey] = {
            classCode: courseForSlot.class || "",
            courseName: courseForSlot.course || "",
            status: courseForSlot.status || "PENDING",
            startTime: courseForSlot.slotStartTime || "",
            endTime: courseForSlot.slotEndTime || "",
            dayOfWeek: courseForSlot.day ?? null,
            date: courseForSlot.date || "",
            room: courseForSlot.room || "",
            instructor: courseForSlot.teacher || "",
          };
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
        if (loading) {
          return <div className="h-12 bg-gray-200 animate-pulse rounded" />;
        }
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
        if (loading) {
          // Skeleton loader for schedule cells
          return (
            <div className="lg:w-full 2xl:max-w-40 lg:min-h-14 xl:min-h-20 flex flex-col gap-2 p-2">
              <div className="h-3 bg-gray-200 animate-pulse rounded w-3/4" />
              <div className="h-3 bg-gray-200 animate-pulse rounded w-full" />
              <div className="h-3 bg-gray-200 animate-pulse rounded w-1/2" />
            </div>
          );
        }

        const course = value as CourseSchedule | undefined;
        return course ? (
          <div
            className={`lg:w-full 2xl:max-w-40 lg:min-h-14 xl:min-h-20 lg:px-1 xl:px-2 flex flex-col justify-between gap-1 font-semibold rounded-sm border px-3 pb-1 py-1.5 mx-auto ${course.status === "PRESENT"
              ? "border-green-700 bg-green-700/10"
              : course.status === "ABSENT"
                ? "border-danger bg-danger/10"
                : "border-gray-500 bg-gray-500/10"
              }`}
          >
            <div className="flex items-center leading-0 justify-between lg:text-[8px] xl:text-[11px]">
              <span className="text-secondary font-semibold lg:text-[10px] xl:text-[11px]">
                {course.classCode}
              </span>
              <Badge
                className={`px-1 py-0 lg:text-[8px] xl:text-[11px] font-medium rounded-sm ${course.status === "PRESENT"
                  ? "border-approve text-approve bg-approve/10"
                  : course.status === "ABSENT"
                    ? "border-danger text-danger bg-danger/10"
                    : "border-gray-500 text-gray-500 bg-gray-500/10"
                  }`}
              >
                {course.status === "PRESENT"
                  ? "Attended"
                  : course.status === "ABSENT"
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
