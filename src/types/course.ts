import type { UserInfo } from "./user";

export type CourseSchedule = {
  class: string;
  courseName: string;
  status: "true" | "false" | "pending";
  startTime: string;
  endTime: string;
  dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  date: string;
  room: string;
  instructor: string;
};

export type Course = {
    courseTerm: string;
    courseName: string;
    classCode: string;
    totalSlots: number;

    // Optional info
    attendancePercent?: number;
    grade?: number;
    instructor?:string;
    term?: string;
    students?: Pick<UserInfo, "avatar">[];
}
