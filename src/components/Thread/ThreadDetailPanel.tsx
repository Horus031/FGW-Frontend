"use client"

import { useState, useEffect, useRef } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"
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
  currentUserRole: string
  isLoadingComments?: boolean
  onCommentAdded?: () => void
}

export default function ThreadDetailPanel({
  thread,
  currentUserId,
  currentUserRole,
  isLoadingComments = false,
  onCommentAdded,
}: ThreadDetailPanelProps) {
  const [replyText, setReplyText] = useState("")
  const [taggedUserIds, setTaggedUsers] = useState<number[]>([])
  const [mentionQuery, setMentionQuery] = useState("")
  const [mentionResults, setMentionResults] = useState<User[]>([])
  const [showMentions, setShowMentions] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [highlightIndex, setHighlightIndex] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const isCreator = thread.createdBy.id === currentUserId
  const isStudent = currentUserRole?.toLowerCase() === "student"

  // 🔍 Search user mention
  useEffect(() => {
    if (isStudent) return
    const query = mentionQuery.startsWith("@") ? mentionQuery.slice(1).trim() : ""
    const shouldSearchAll = mentionQuery === "@"

    if (!query && !shouldSearchAll) {
      setMentionResults([])
      return
    }

    const delay = setTimeout(async () => {
      try {
        setIsSearching(true)
        const res = await searchUsers(query)
        const filtered = res.filter((u) => Number(u.id) !== currentUserId)
        setMentionResults(filtered)
        setHighlightIndex(0)
      } catch (err) {
        console.error("searchUsers failed:", err)
        setMentionResults([])
      } finally {
        setIsSearching(false)
      }
    }, 300)

    return () => clearTimeout(delay)
  }, [mentionQuery, currentUserId, isStudent])

  useEffect(() => {
    setReplyText("")
    setTaggedUsers([])
    setShowMentions(false)
  }, [thread.id])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setReplyText(value)
    const cursor = e.target.selectionStart || 0
    const textBefore = value.slice(0, cursor)
    const match = textBefore.match(/@\w*$/)

    if (isStudent) {
      setShowMentions(false)
      setMentionQuery("")
      return
    }

    if (match) {
      setMentionQuery(match[0])
      setShowMentions(true)
    } else {
      setMentionQuery("")
      setShowMentions(false)
    }
  }

  // 🧩 Select mention
  const handleSelectMention = (user: User) => {
    const newText = replyText.replace(/@\w*$/, `@${user.email} `)
    setReplyText(newText)
    setTaggedUsers((prev) => Array.from(new Set([...prev, user.id])))
    setShowMentions(false)
    setMentionQuery("")
    inputRef.current?.focus()
  }

  // ⌨️ Keyboard navigation for dropdown
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (showMentions && mentionResults.length > 0) {
      if (e.key === "ArrowDown") {
        e.preventDefault()
        setHighlightIndex((prev) => (prev + 1) % mentionResults.length)
        return
      }

      if (e.key === "ArrowUp") {
        e.preventDefault()
        setHighlightIndex(
          (prev) => (prev - 1 + mentionResults.length) % mentionResults.length
        )
        return
      }

      if (e.key === "Enter") {
        e.preventDefault()
        const selectedUser = mentionResults[highlightIndex]
        if (selectedUser) {
          handleSelectMention(selectedUser)
          setMentionQuery("")
        }
        return
      }

      if (e.key === "Escape") {
        setShowMentions(false)
        return
      }
    }
  }

  // 🚀 Submit comment
  const handleReplySubmit = async () => {
    if (!replyText.trim() || isSubmitting) return

    setIsSubmitting(true)
    try {
      await addComment(thread.id, {
        content: replyText.trim(),
        taggedUserIds: isStudent ? [] : taggedUserIds.map((id) => Number(id)),
      })
      setReplyText("")
      setTaggedUsers([])
      setShowMentions(false)
      setMentionResults([])
      onCommentAdded?.()
    } catch (err) {
      console.error("Add comment failed:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()

  // ✅ Highlight mentions thực sự được tag
  const renderContentWithMentions = (
    text: string,
    taggedUsers: { id: number; email: string }[]
  ) => {
    if (!taggedUsers?.length) return text
    const parts = text.split(/(@[^\s]+)/g)
    return parts.map((part, i) => {
      if (part.startsWith("@")) {
        const email = part.slice(1)
        const isTagged = taggedUsers.some((u) => u.email === email)
        if (isTagged) {
          return (
            <span key={i} className="text-blue-500 font-medium">
              {part}
            </span>
          )
        }
      }
      return part
    })
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
                {formatDistanceToNow(new Date(thread.createdAt), {
                  addSuffix: true,
                })}
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
                   {renderContentWithMentions(comment.content, comment.taggedUsers || [])}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}

        {/* 💬 Reply input */}
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
                  if (showMentions) return // 🚫 không gửi khi dropdown đang mở
                  handleReplySubmit()
                }}
              >
                <Input
                  ref={inputRef}
                  placeholder={
                    isStudent
                      ? "Reply (mentions disabled for students)"
                      : "Reply (use @ to mention)"
                  }
                  value={replyText}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                />
                <Button
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full h-7 w-7"
                  type="submit"
                  size="icon"
                  disabled={!replyText.trim() || isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="animate-spin border-2 border-current border-t-transparent rounded-full size-4"></span>
                  ) : (
                    <ArrowUp className="size-4" />
                  )}
                </Button>
              </form>

              {/* 🧩 Dropdown mention */}
              {!isStudent && showMentions && (
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
                    mentionResults.map((user, idx) => (
                      <div
                        key={user.id}
                        onClick={() => handleSelectMention(user)}
                        className={`p-2 flex items-center gap-2 cursor-pointer ${
                          highlightIndex === idx ? "bg-accent" : "hover:bg-accent"
                        }`}
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
                    <div className="p-2 text-sm text-muted-foreground">
                      No users found
                    </div>
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
