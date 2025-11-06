// src/api/requests/attendance.api.ts
import type { AttendanceResponse, AttendanceStats } from "../../models/attendance";
import api from "../apiRequest";

export const getAttendanceByStudentID = async (
  studentId: string,
  startDate: string,
  endDate: string
): Promise<AttendanceResponse > => {
  const response = await api.get<AttendanceResponse >("/attendance/schedule", {
    params: {
      studentId,
      startDate,
      endDate,
    },
  });
  return response.data;
};

export const getStatsForStudents = async (courseId: string, classId: string): Promise<AttendanceStats[]> => {
  const response = await api.get<AttendanceStats[]>(`/attendance/stats?courseId=${courseId}&classId=${classId}`)

  return response.data;
}
