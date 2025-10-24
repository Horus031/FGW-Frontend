import ThreadCard from "./ThreadCard"
import { MessageSquare  } from "lucide-react"

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
    email: string
    name: string
  }>
}

interface ThreadListProps {
  threads: Thread[]
  error: string | null
  currentUserId: number
  isLoading: boolean
}

export default function ThreadList({ threads, currentUserId, isLoading }: ThreadListProps) {

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-32 bg-muted rounded-lg animate-pulse" />
        ))}
      </div>
    )
  }

  if (threads.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <MessageSquare className="size-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold text-foreground">No threads yet</h3>
        <p className="text-muted-foreground mt-2">
          You haven't created any threads or been tagged in any discussions yet.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
    {/* <pre>{JSON.stringify(threads, null, 2)}</pre> */}
      {threads.map((thread) => (
        <ThreadCard key={thread.id} thread={thread} currentUserId={currentUserId} />
      ))}
    </div>
  )
}
