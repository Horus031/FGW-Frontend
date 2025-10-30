import type { Course } from "../../models/course";
import api from "../apiRequest";

export const getAllCourseForStudent = async (
    page: number,
    limit: number,
    departmentid?: number,
    code?: string,
    teacherid?: string,
    level?: string
): Promise<Course> => {
  const response = await api.get<Course>("/courses", {
    params: {
      page,
      limit,
      departmentid,
      code,
      teacherid,
      level
    },
  });
  return response.data;
};
