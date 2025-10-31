import type { ClassGroup } from "../../models/class";
import api from "../apiRequest";

export const getAllClasses = async (programmeId: number, termId: number, departmentId: number): Promise<ClassGroup[]> => {
    const response = await api.get<ClassGroup[]>(`/classes?programmeId=${programmeId | 0}&termId=${termId | 0}&departmentId=${departmentId | 0}&order=ASC`);

    return response.data;
};