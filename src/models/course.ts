import type { UserInfo } from "./user";

export type ScheduleStatus = "present" | "absent" | "pending";
export type GradeStatus = "pass" | "fail";
export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;


export type CourseSchedule = {
  classCode: string;
  courseName: string;
  status: ScheduleStatus;
  startTime: string;
  endTime: string;
  dayOfWeek: DayOfWeek;
  date: string;
  room: string;
  instructor: string;
};

export type Course = {
  courseTerm: string;
  courseName: string;
  classCode: string;
  totalSlots: number;
  attendancePercent?: number;
  gradeStatus?: GradeStatus;
  grade?: number;
  instructor?: string;
  students?: Pick<UserInfo, "avatar">[];
};

// Course card display (summary view)
export type CourseAttendance = Pick<Course, "courseName" | "classCode" | "totalSlots" | "attendancePercent"> & {
  termLabel: string;
};

export type CourseMark = Pick<Course, "courseName" | "classCode" | "grade" | "gradeStatus"> & {
  termLabel?: string;
};

export type CourseFeedback = Pick<Course, "classCode" | "courseName">

export type ScheduleRowData = {
  timeSlot: string;
  monday?: CourseSchedule;
  tuesday?: CourseSchedule;
  wednesday?: CourseSchedule;
  thursday?: CourseSchedule;
  friday?: CourseSchedule;
  saturday?: CourseSchedule;
  sunday?: CourseSchedule;
};

