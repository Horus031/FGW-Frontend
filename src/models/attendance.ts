import type { ScheduleStatus } from "./course";

export type AttendanceSlot = {
  slotName: string;
  date: string;
  status: ScheduleStatus;
  classCode: string;
};

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
