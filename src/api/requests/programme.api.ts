import type { Programme } from "../../models/programme";
import api from "../apiRequest";

export const getAllProgrammes = async (): Promise<Programme[]> => {
  const response = await api.get<Programme[]>("/programmes?order=ASC");

  return response.data;
};
