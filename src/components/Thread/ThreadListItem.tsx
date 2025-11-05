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
      className={`p-4 cursor-pointer transition-all ${
        isSelected
          ? "border-2 border-primary bg-white shadow-none"
          : "border-2 border-gray-200 hover:border-gray-300 shadow-none bg-white"
      }`}
    >
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-base text-gray-900 line-clamp-2">{thread.title}</h3>
          {isCreator && (
            <Badge variant="secondary" className="text-xs flex-shrink-0">
              Creator
            </Badge>
          )}
        </div>

        <p className="text-sm text-gray-500">
          {formatDistanceToNow(new Date(thread.createdAt), { addSuffix: true })}
        </p>
      </div>
    </Card>
  )
}
