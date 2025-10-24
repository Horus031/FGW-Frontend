"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Badge } from "../ui/badge"
import { MessageCircle, Tag } from "lucide-react"
import { useNavigate } from "react-router-dom"
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
    taggedUsers: Array<{
      id: number
      email: string
      name: string
    }>
  }
  currentUserId: number
}

export default function ThreadCard({ thread, currentUserId }: ThreadCardProps) {
  const navigate = useNavigate()
  const isCreator = thread.createdBy.id === currentUserId
  const isTagged = thread.taggedUsers.some((user) => user.id === currentUserId)

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate(`/thread/${thread.id}`)}>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <CardTitle className="text-xl">{thread.title}</CardTitle>
              {isCreator && (
                <Badge variant="secondary" className="text-xs">
                  Creator
                </Badge>
              )}
              {isTagged && !isCreator && (
                <Badge variant="outline" className="text-xs gap-1">
                  <Tag className="size-3" />
                  Tagged
                </Badge>
              )}
            </div>
            <CardDescription className="flex items-center gap-2">
              <Avatar className="size-6">
                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${thread.createdBy.email}`} />
                <AvatarFallback>{getInitials(thread.createdBy.email)}</AvatarFallback>
              </Avatar>
              <span>
                {thread.createdBy.email} • {formatDistanceToNow(new Date(thread.createdAt), { addSuffix: true })}
              </span>
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-2">
        <p className="text-foreground line-clamp-2">{thread.content}</p>

        {thread.taggedUsers.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {thread.taggedUsers.slice(0, 3).map((user) => (
              <Badge key={user.id} variant="outline" className="text-xs">
                @{user.email}
              </Badge>
            ))}
            {thread.taggedUsers.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{thread.taggedUsers.length - 3} more
              </Badge>
            )}
          </div>
        )}

        <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
          <div className="flex items-center gap-1">
            <MessageCircle className="size-4" />
            {/* <span>{thread.comments.length} comments</span> */}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
