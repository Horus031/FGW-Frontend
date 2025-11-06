import type { DayOfWeek, ScheduleStatus } from "./course";
import type { Session } from "./session";
import type { Student } from "./user";

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

export type AttendanceStats = {
  studentId?: string;
  studentCode: string;
  studentName: string;
  total?: number;
  present?: number;
  absent?: number;
  pending?: number;
  attendanceRate: number;
  info?: string;
};

export type AttendanceRecords = {
  id: string;
  studentId: string;
  student: Student;
  sessionId: string;
  session: Session;
  status: string;
  note: string;
};
