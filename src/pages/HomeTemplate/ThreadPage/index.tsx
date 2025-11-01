"use client"

import { useEffect, useState, useCallback } from "react"
import { useUserStore } from "../../../store/user"
import ThreadListPanel from "../../../components/Thread/ThreadListPanel"
import ThreadDetailPanel from "../../../components/Thread/ThreadDetailPanel"
import api from "../../../api/apiRequest"
import { getComments, type Comment, type GetCommentsResponse } from "../../../api/requests/thread.api"

interface Thread {
  id: number
  title: string
  content: string
  createdAt: string
  createdBy: {
    id: number
    name: string
    email: string
  }
  comments?: Comment[]
}

export default function ThreadPage() {
  const { user } = useUserStore()
  const [threads, setThreads] = useState<Thread[]>([])
  const [selectedThreadId, setSelectedThreadId] = useState<number | null>(null)
  const [isLoadingThreads, setIsLoadingThreads] = useState(true)
  const [isLoadingComments, setIsLoadingComments] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchThreads = useCallback(async () => {
    if (!user?.id) return

    try {
      setIsLoadingThreads(true)
      const response = await api.get(`/threads`)
      if (response.status !== 200) throw new Error("Failed to fetch threads")

      const data = response.data
      setThreads(data)
      setSelectedThreadId((prev) => prev ?? (data.length > 0 ? data[0].id : null))
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      setThreads([])
    } finally {
      setIsLoadingThreads(false)
    }
  }, [user])

  const fetchComments = useCallback(async (threadId: number) => {
  try {
    setIsLoadingComments(true)
    const response: GetCommentsResponse = await getComments(threadId)
    const comments = response.comments
    setThreads((prevThreads) =>
      prevThreads.map((t) => (t.id === threadId ? { ...t, comments } : t))
    )
  } catch (err) {
    console.error(err)
  } finally {
    setIsLoadingComments(false)
  }
}, [])

  useEffect(() => {
    fetchThreads()
  }, [fetchThreads])

  useEffect(() => {
    if (selectedThreadId) {
      fetchComments(selectedThreadId)
    }
  }, [selectedThreadId, fetchComments])

  const selectedThread = threads.find((t) => t.id === selectedThreadId)

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-muted-foreground">Please log in to view threads</div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <ThreadListPanel
              threads={threads}
              isLoading={isLoadingThreads}
              error={error}
              selectedThreadId={selectedThreadId}
              onSelectThread={setSelectedThreadId}
              currentUserId={Number(user.id)}
              onThreadsUpdated={() => {
                fetchThreads()
                if (selectedThreadId) fetchComments(selectedThreadId)
              }}
            />
          </div>

          <div className="lg:col-span-2">
            {selectedThread ? (
              <ThreadDetailPanel
                thread={selectedThread}
                currentUserId={Number(user.id)}
                currentUserRole={user.role.name}
                isLoadingComments={isLoadingComments}
                onCommentAdded={() => selectedThreadId && fetchComments(selectedThreadId)}
              />
            ) : (
              <div className="flex items-center justify-center h-96 text-muted-foreground">
                Select a thread to view details
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
