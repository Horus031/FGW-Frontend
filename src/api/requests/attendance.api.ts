// src/api/requests/attendance.api.ts
import type { AttendanceResponse } from "../../models/attendance";
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
