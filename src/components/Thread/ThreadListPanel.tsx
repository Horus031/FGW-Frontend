"use client"

import { useState, useMemo } from "react"
import { Button } from "../ui/button"
import { Card } from "../ui/card"
import { Input } from "../ui/input"
import { Plus, MessageSquare, Search } from "lucide-react"
import ThreadListItem from "./ThreadListItem"
import CreateThreadModal from "./CreateThread"
import { useUserStore } from "../../store/user"

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
}

interface ThreadListPanelProps {
  threads: Thread[]
  isLoading: boolean
  error: string | null
  selectedThreadId: number | null
  onSelectThread: (threadId: number) => void
  currentUserId: number
  onThreadsUpdated?: () => void
}

export default function ThreadListPanel({
  threads,
  isLoading,
  error,
  selectedThreadId,
  onSelectThread,
  currentUserId,
  onThreadsUpdated,
}: ThreadListPanelProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const role = useUserStore((state) => state.user?.role.name);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const filteredThreads = useMemo(() => {
    return threads.filter(
      (thread) =>
        thread.title.toLowerCase().includes(searchQuery.toLowerCase()) 
    )
  }, [threads, searchQuery])

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-24 bg-muted rounded-lg animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <Card className="space-y-4 p-4 border-2 shadow-none">
      <div className="flex items-center justify-between mb-0">
        <h2 className="text-lg font-semibold text-foreground">Threads ({threads.length})</h2>
        {role === "Student" ? (null
        ) : (
          <Button
          size="sm"
          variant="ghost"
          onClick={() => setIsCreateModalOpen(true)}
          className="gap-2 text-secondary hover:bg-secondary/10"
        >
          <Plus className="size-4" />
          New Threads
        </Button>
        )}
      </div>

      <div className="relative mb-0">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          placeholder="Search your threads"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-background"
        />
      </div>

      <div className="space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto">
        {error && <div className="text-sm text-destructive bg-destructive/10 p-3 rounded">{error}</div>}

        {filteredThreads.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <MessageSquare className="size-8 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">No threads found</p>
          </div>
        ) : (
          filteredThreads.map((thread) => (
            <ThreadListItem
              key={thread.id}
              thread={thread}
              isSelected={selectedThreadId === thread.id}
              onSelect={() => onSelectThread(thread.id)}
              currentUserId={currentUserId}
            />
          ))
        )}
      </div>

      <CreateThreadModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={() => {
          setIsCreateModalOpen(false)
          onThreadsUpdated?.()
        }}
        userId={currentUserId}
      />
    </Card>
  )
}
