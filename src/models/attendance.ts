import type { ScheduleStatus } from "./course";

export type AttendanceSlot = {
  slot: string;
  date: string;
  status: ScheduleStatus;
  code: string;
};


export type AttendanceSlotProps = {
  data: AttendanceSlot[];
}


// Module Details section (detailed view for selected course)
export type CourseAttendanceDetails = {
  courseName: string;
  classCode: string;
  termLabel: string; // Link to which term this course belongs
  totalSlots: number;
  present: number;
  absent: number;
  attendancePercent: number;
  slots: AttendanceSlot[];
};
