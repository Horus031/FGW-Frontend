import type { CourseGroup } from "../../models/course";
import api from "../apiRequest";

export const getAllCourseForStudent = async (
  page?: number,
  limit?: number,
  studentId?: string,
  departmentid?: number,
  code?: string,
  teacherid?: string,
  level?: string
): Promise<CourseGroup[]> => {
  const response = await api.get<CourseGroup[]>(`/courses`, {
    params: {
      page,
      limit,
      studentId,
      departmentid,
      code,
      teacherid,
      level,
      order: "ASC",
    },
  });
  return response.data;
};
