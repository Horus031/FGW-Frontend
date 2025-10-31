import api from "../apiRequest"

export interface User {
  id: number
  name: string
  email: string
  role: string
  createdAt: string
}

export const searchUsers = async (
  search: string,
  page: number = 1,
  limit: number = 10
): Promise<User[]> => {
  const response = await api.get<User[]>(`/users`, {
    params: { page, limit, search },
  })
  return response.data
}

