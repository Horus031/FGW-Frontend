"use client"

import { useEffect, useState } from "react"
import { useUserStore } from "../../../store/user"
import ThreadHeader from "../../../components/Thread/ThreadHeader"
import ThreadList from "../../../components/Thread/ThreadList"
import api from "../../../api/apiRequest"

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
  comments: Array<{
    id: number
    content: string
    createdBy: {
      id: number
      name: string
    }
  }>
  taggedUsers: Array<{
    id: number
    name: string
  }>
}

export default function ThreadPage() {
  const { user } = useUserStore();
  const [threads, setThreads] = useState<Thread[]>([])
  const [isLoadingThreads, setIsLoadingThreads] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user?.id) return

    const fetchThreads = async () => {
      try {
        setIsLoadingThreads(true)
        const response = await api.get(`/threads/user/${user.id}`);
        
        console.log(response.data);
        
        if (response.status !== 200) throw new Error("Failed to fetch threads")
        const data = await response.data
      
              
        setThreads(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
        setThreads([])
      } finally {
        setIsLoadingThreads(false)
      }
    }

    fetchThreads()
  }, [user?.id])

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-muted-foreground">Please log in to view threads</div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <ThreadHeader user={user} />
      <div className="container mx-auto px-4 py-8">
        <ThreadList threads={threads} isLoading={isLoadingThreads} error={error} currentUserId={user.id} />
      </div>
    </main>
  )
}
