import type { Term } from "../../models/term";
import api from "../apiRequest";

export const getAllTerms = async (programmeId: number, departmentId?: number, academicYear?: string, code?: string): Promise<Term[]> => {
    const response = await api.get<Term[]>(`/terms?programmeId=${programmeId || 0}&departmentId=${departmentId || 0}&academicYear=${academicYear || ""}&code=${code || ""}`);

    return response.data;
}