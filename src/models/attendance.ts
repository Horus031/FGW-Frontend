import type { DayOfWeek, ScheduleStatus } from "./course";

export interface AttendanceSlot {
  class?: string;
  course?: string;
  room?: string;
  teacher?: string;
  status?: ScheduleStatus;
  day?: DayOfWeek;
  slot?: string;
  slotStartTime?: string;
  slotEndTime?: string;
  date?: string;
  classid?: string;
}

export interface AttendanceResponse {
  studentId?: number;
  startDate?: string;
  endDate?: string;
  schedule: AttendanceSlot[];
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
