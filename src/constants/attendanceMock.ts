import type { CourseGroup } from "../models/course";

export type TimeSlot = {
  slot: number;
  startTime: string;
  endTime: string;
  status: string; // e.g. "Completed" | "Pending"
};

export type TimeSlotData = {
  className: string;
  timeSlotGroup: TimeSlot[];
};

// Courses the teacher is teaching today (mock)
export const todaysCourses: CourseGroup[] = [
  {
    id: "cg-001",
    departmentId: "dept-cs",
    code: "COS1204",
    title: "Computer Networks",
    credits: 3,
    level: "Undergraduate",
    teacherId: "t-001",
    slot: 1,
    status: "active",
  },
  {
    id: "cg-002",
    departmentId: "dept-cs",
    code: "COS1205",
    title: "Operating Systems",
    credits: 3,
    level: "Undergraduate",
    teacherId: "t-001",
    slot: 2,
    status: "active",
  },
  {
    id: "cg-003",
    departmentId: "dept-it",
    code: "DESI1219",
    title: "Software Design",
    credits: 2,
    level: "Undergraduate",
    teacherId: "t-001",
    slot: 3,
    status: "active",
  },
];

// Time slots grouped by course group id. When a teacher selects a course group
// the UI can look up the time slots to render inside `CourseGroupList`.
export const timeSlotByCourseId: Record<string, TimeSlotData> = {
  "cg-001": {
    className: "COS1204 - A",
    timeSlotGroup: [
      { slot: 1, startTime: "08:00", endTime: "09:30", status: "Pending" },
      { slot: 2, startTime: "09:30", endTime: "11:00", status: "Pending" },
      { slot: 3, startTime: "12:00", endTime: "13:30", status: "Pending" },
    ],
  },
  "cg-002": {
    className: "COS1205 - B",
    timeSlotGroup: [
      { slot: 1, startTime: "08:00", endTime: "09:30", status: "Pending" },
      { slot: 2, startTime: "09:30", endTime: "11:00", status: "Pending" },
    ],
  },
  "cg-003": {
    className: "DESI1219.1",
    timeSlotGroup: [
      { slot: 1, startTime: "08:00", endTime: "09:30", status: "Pending" },
      { slot: 2, startTime: "13:30", endTime: "15:00", status: "Pending" },
      { slot: 3, startTime: "15:30", endTime: "17:00", status: "Pending" },
    ],
  },
};

export function getTimeSlotForCourse(courseId: string): TimeSlotData | undefined {
  return timeSlotByCourseId[courseId];
}

export function setTimeSlotStatus(courseId: string, slot: number, status: string) {
  const data = timeSlotByCourseId[courseId];
  if (!data) return;
  const t = data.timeSlotGroup.find((s) => s.slot === slot);
  if (t) t.status = status;
}

export default {
  todaysCourses,
  timeSlotByCourseId,
  getTimeSlotForCourse,
};
