import api from "../apiRequest"

export interface Thread {
  id: number
  title: string
  content: string
  createdAt: string
  createdBy: {
    id: number
    name: string
    email: string
  }
}

export interface Comment {
  id: number
  content: string
  createdAt: string
  createdBy: {
    id: number
    name: string
    email: string
  }
  taggedUserIds?: number[]
}

export interface GetCommentsResponse {
  count: number
  comments: Comment[]
}



export interface CreateThreadPayload {
  title: string
  content: string
}

export interface CreateCommentPayload {
  content: string,
  taggedUserIds?: number[]
}

export const getThreads = async () => {
  const response = await api.get<Thread[]>("/threads")
  return response.data
}

export const createThread = async (payload: CreateThreadPayload) => {
  const response = await api.post<Thread>("/threads", payload)
  return response.data
}

export const updateThread = async (threadId: number, payload: Partial<CreateThreadPayload>) => {
  const response = await api.put<Thread>(`/threads/${threadId}`, payload)
  return response.data
}

export const deleteThread = async (threadId: number) => {
  const response = await api.post(`/threads/${threadId}/delete`)
  return response.data
}

export const getComments = async (threadId: number): Promise<GetCommentsResponse> => {
  const response = await api.get<GetCommentsResponse>(`/comments/thread/${threadId}`)
  return response.data
}

export const addComment = async (threadId: number, payload: CreateCommentPayload) => {  
  const response = await api.post<Comment>(`/comments/thread/${threadId}`, payload)
  return response.data
}

export const deleteComment = async (threadId: number, commentId: number) => {
  const response = await api.post(`/threads/${threadId}/comments/${commentId}/delete`)
  return response.data
}
