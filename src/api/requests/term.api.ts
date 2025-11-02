import type { Term } from "../../models/term";
import api from "../apiRequest";

export const getAllTerms = async (programmeId: number): Promise<Term[]> => {
    const response = await api.get<Term[]>(`/terms?programmeId=${programmeId || 0}`);

    return response.data;
}