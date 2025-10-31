"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "../ui/button"
import { X } from "lucide-react"
import { createThread } from "../../api/requests/thread.api"

interface CreateThreadModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
  userId: number
}

export default function CreateThreadModal({ isOpen, onClose, onSuccess }: CreateThreadModalProps) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (title.trim().length < 5) {
      setError("Title must be at least 5 characters")
      return
    }

    if (content.trim().length < 10) {
      setError("Content must be at least 10 characters")
      return
    }

    setLoading(true)
    try {
      await createThread({
        title: title.trim(),
        content: content.trim(),
      })
      
      setTitle("")
      setContent("")
      onSuccess?.()
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create thread")
      console.error("Error creating thread:", err)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card rounded-lg shadow-lg w-full max-w-2xl mx-4">
        <div className="flex items-center justify-between border-b p-6">
          <h2 className="text-xl font-bold text-foreground">Add a new thread</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="size-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Thread Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Assignment Feedback - Week 8"
              className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your content here..."
              rows={6}
              className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              disabled={loading}
            />
          </div>

          {error && <div className="text-sm text-destructive bg-destructive/10 p-3 rounded">{error}</div>}

          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} disabled={loading} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? "Creating..." : "Create a thread"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
