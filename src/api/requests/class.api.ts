import type { ClassGroup } from "../../models/class";
import type { CourseGroup } from "../../models/course";
import api from "../apiRequest";

export const getAllClasses = async (programmeId: number, termId: number, departmentId: number): Promise<ClassGroup[]> => {
    const response = await api.get<ClassGroup[]>(`/classes?programmeId=${programmeId | 0}&termId=${termId | 0}&departmentId=${departmentId | 0}&order=ASC`);

    return response.data;
};

export const getAllCourseInClass = async (classId: string): Promise<CourseGroup[]> => {
    const response = await api.get<CourseGroup[]>(`/classes/${classId}/courses`);

    return response.data;
};