"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Badge } from "../ui/badge"
import { MessageCircle } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface ThreadCardProps {
  thread: {
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
  }
  currentUserId: number
  onClick?: (threadId: number) => void
}

export default function ThreadCard({ thread, currentUserId, onClick }: ThreadCardProps) {
  const isCreator = thread.createdBy.id === currentUserId

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()

  return (
    <Card
      className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-primary"
      onClick={() => onClick?.(thread.id)}
    >
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <CardTitle className="text-lg">{thread.title}</CardTitle>
              {isCreator && (
                <Badge variant="secondary" className="text-xs">
                  Creator
                </Badge>
              )}
            </div>
            <CardDescription className="flex items-center gap-2">
              <Avatar className="size-6">
                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${thread.createdBy.email}`} />
                <AvatarFallback>{getInitials(thread.createdBy.email)}</AvatarFallback>
              </Avatar>
              <span className="text-sm">
                {thread.createdBy.email} • {formatDistanceToNow(new Date(thread.createdAt), { addSuffix: true })}
              </span>
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="text-foreground line-clamp-2 text-sm">{thread.content}</p>

        <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
          <div className="flex items-center gap-1">
            <MessageCircle className="size-4" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
