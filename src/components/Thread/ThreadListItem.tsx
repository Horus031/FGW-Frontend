"use client"

import { Card } from "../ui/card"
import { Badge } from "../ui/badge"
import { formatDistanceToNow } from "date-fns"

interface ThreadListItemProps {
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
  }
  isSelected: boolean
  onSelect: () => void
  currentUserId: number
}

export default function ThreadListItem({ thread, isSelected, onSelect, currentUserId }: ThreadListItemProps) {
  const isCreator = thread.createdBy.id === currentUserId

  return (
    <Card
      onClick={onSelect}
      className={`p-4 cursor-pointer transition-all border-l-4 ${
        isSelected
          ? "border-l-primary bg-primary/5 shadow-md"
          : "border-l-transparent hover:bg-muted/50 hover:shadow-sm"
      }`}
    >
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-sm text-foreground line-clamp-2">{thread.title}</h3>
          {isCreator && (
            <Badge variant="secondary" className="text-xs flex-shrink-0">
              Creator
            </Badge>
          )}
        </div>

        <p className="text-xs text-muted-foreground">
          {formatDistanceToNow(new Date(thread.createdAt), { addSuffix: true })}
        </p>
      </div>
    </Card>
  )
}
