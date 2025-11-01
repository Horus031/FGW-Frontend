"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Skeleton } from "../ui/skeleton"
import { Edit, Trash2, ArrowUp } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { addComment, type Comment } from "../../api/requests/thread.api"
import { searchUsers, type User } from "../../api/requests/user.api"

interface ThreadDetailPanelProps {
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
    comments?: Comment[]
  }
  currentUserId: number
  isLoadingComments?: boolean
  onCommentAdded?: () => void
}

export default function ThreadDetailPanel({
  thread,
  currentUserId,
  isLoadingComments = false,
  onCommentAdded,
}: ThreadDetailPanelProps) {
  const [replyText, setReplyText] = useState("")
  const [taggedUserIds, setTaggedUsers] = useState<number[]>([])
  const [mentionQuery, setMentionQuery] = useState("")
  const [mentionResults, setMentionResults] = useState<User[]>([])
  const [showMentions, setShowMentions] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const isCreator = thread.createdBy.id === currentUserId


  useEffect(() => {
    const delay = setTimeout(async () => {
      if (mentionQuery.startsWith("@")) {
        const query = mentionQuery.length > 1 ? mentionQuery.slice(1) : ""
        setIsSearching(true)
        try {
          const res = await searchUsers(query)
          const filtered = res.filter((user) => Number(user.id) !== currentUserId)
          
          setMentionResults(filtered)
        } catch (err) {
          console.error("searchUsers failed:", err)
          setMentionResults([])
        } finally {
          setIsSearching(false)
        }
      } else {
        setMentionResults([])
        setIsSearching(false)
      }
    }, 300)

    return () => clearTimeout(delay)
  }, [mentionQuery, currentUserId])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setReplyText(value)

    const cursor = e.target.selectionStart || 0
    const textBefore = value.slice(0, cursor)
    const match = textBefore.match(/@\w*$/)
    if (match) {
      setMentionQuery(match[0])
      setShowMentions(true)
    } else {
      setShowMentions(false)
    }
  }

  const handleSelectMention = (user: any) => {
    const newText = replyText.replace(/@\w*$/, `@${user.email} `)
    setReplyText(newText)
    setTaggedUsers((prev) => Array.from(new Set([...prev, user.id])))
    setShowMentions(false)
    inputRef.current?.focus()
  }

  const handleReplySubmit = async () => {
    if (replyText.trim()) {
      await addComment(thread.id, {
        content: replyText.trim(),
        taggedUserIds: taggedUserIds.map((id) => Number(id)),
      })
      setReplyText("")
      setTaggedUsers([])
      onCommentAdded?.()
    }
  }

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()

  const renderContentWithMentions = (text: string) => {
    const parts = text.split(/(@[^\s]+)/g)
    return parts.map((part, index) =>
      part.startsWith("@") ? (
        <span key={index} className="text-secondary font-medium">
          {part}
        </span>
      ) : (
        part
      )
    )
  }

  const comments = thread.comments ?? []

  return (
    <Card className="pt-8 relative gap-2">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="text-2xl mb-2">{thread.title}</CardTitle>
            <CardDescription className="flex items-center gap-2">
              <span className="text-sm">
                {thread.createdBy.email} •{" "}
                {formatDistanceToNow(new Date(thread.createdAt), { addSuffix: true })}
              </span>
            </CardDescription>
          </div>

          {isCreator && (
            <div className="flex gap-2">
              <Button size="sm" variant="ghost" className="gap-2">
                <Edit className="size-4" />
                Edit
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="gap-2 text-destructive hover:text-destructive"
              >
                <Trash2 className="size-4" />
                Delete
              </Button>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="mb-4">
        <p className="text-foreground leading-relaxed">{thread.content}</p>
      </CardContent>

      <hr />

      <div className="space-y-4 p-4">
        <div className="text-lg font-semibold">
          {isLoadingComments ? "Loading replies..." : `${comments.length} replies`}
        </div>

        {isLoadingComments ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex gap-3 p-2">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="p-2">
              <div className="flex gap-3">
                <Avatar className="size-10 flex-shrink-0">
                  <AvatarImage
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.createdBy.email}`}
                  />
                  <AvatarFallback>{getInitials(comment.createdBy.email)}</AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">{comment.createdBy.email}</span>
                    <span className="text-xs text-muted-foreground">
                      • {comment.createdBy.role.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      •{" "}
                      {comment.createdAt
                        ? formatDistanceToNow(new Date(comment.createdAt), {
                            addSuffix: true,
                          })
                        : ""}
                    </span>
                  </div>
                  <p className="text-sm text-foreground whitespace-pre-line">
                    {renderContentWithMentions(comment.content)}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}

        {/* Input reply + mentions */}
        <div className="pl-2 relative">
          <div className="flex gap-3">
            <Avatar className="size-10 flex-shrink-0">
              <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=current-user`} />
              <AvatarFallback>ME</AvatarFallback>
            </Avatar>

            <div className="relative w-full">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleReplySubmit()
                }}
              >
                <Input
                  ref={inputRef}
                  placeholder="Reply (use @ to mention)"
                  value={replyText}
                  onChange={handleInputChange}
                />
                <Button className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full h-7 w-7" type="submit" size="icon" disabled={!replyText.trim()}>
                  <ArrowUp className="size-4" />
                </Button>
              </form>


              {/* 🧩 mention suggestions */}
              {showMentions && (
                <div className="absolute z-50 left-0 mt-2 w-full bg-popover border rounded-md shadow-lg max-h-48 overflow-auto">
                  {isSearching ? (
                    <div className="p-2 space-y-2">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="flex items-center gap-2 p-1">
                          <Skeleton className="size-6 rounded-full" />
                          <Skeleton className="h-4 w-32" />
                        </div>
                      ))}
                    </div>
                  ) : mentionResults.length > 0 ? (
                    mentionResults.map((user) => (
                      <div
                        key={user.id}
                        onClick={() => handleSelectMention(user)}
                        className="p-2 hover:bg-accent cursor-pointer flex items-center gap-2"
                      >
                        <Avatar className="size-6">
                          <AvatarImage
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                          />
                          <AvatarFallback>{user.name?.[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{user.name || user.email}</span>
                      </div>
                    ))
                  ) : (
                    <div className="p-2 text-sm text-muted-foreground">No users found</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
