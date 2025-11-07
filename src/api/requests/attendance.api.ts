// src/api/requests/attendance.api.ts
import type {
  AttendanceRecords,
  AttendanceResponse,
  AttendanceStats,
} from "../../models/attendance";
import api from "../apiRequest";

export const getAttendanceByStudentID = async (
  studentId: string,
  startDate: string,
  endDate: string
): Promise<AttendanceResponse> => {
  const response = await api.get<AttendanceResponse>("/attendance/schedule", {
    params: {
      studentId,
      startDate,
      endDate,
    },
  });
  return response.data;
};

export const getStatsForStudents = async (
  studentId: string | undefined,
  courseId: string,
  classId: string
): Promise<AttendanceStats | AttendanceStats[]> => {
  const response = await api.get<AttendanceStats | AttendanceStats[]>(
    `/attendance/stats?studentId=${studentId || ""}&courseId=${courseId}&classId=${classId}`
  );

  return response.data;
};

export const listAttendanceRecords = async (
  studentId: string | undefined,
  courseId: string
): Promise<AttendanceRecords[]> => {
  const response = await api.get<AttendanceRecords[]>(
    `/attendance?studentId=${studentId || ""}&courseId=${courseId}`
  );

  return response.data;
};
