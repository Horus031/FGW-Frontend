"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "../ui/button"
import { X } from "lucide-react"
import api from "../../api/apiRequest"

interface CreateThreadModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
  userId: number
}

export default function CreateThreadModal({ isOpen, onClose, onSuccess, userId }: CreateThreadModalProps) {
  const [title, setTitle] = useState("")
  const [taggedUserIds, setTaggedUserIds] = useState<number[]>([])
  const [users, setUsers] = useState<Array<{ id: number; name: string }>>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Fetch available users when modal opens
  const fetchUsers = async () => {
    try {
      const response = await api.get('/users')
      if (!response) throw new Error("Failed to fetch users")
        console.log(response);
        
      const data = await response
      setUsers(data)
    } catch (err) {
      console.error("[v0] Error fetching users:", err)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (title.trim().length < 5) {
      setError("Title must be at least 5 characters")
      return
    }

    setLoading(true)
    try {
        const response = await api.post("/threads", 
        {  
            title: title.trim(),
            taggedUserIds, 
        });

      if (!response) throw new Error("Failed to create thread")

      setTitle("")
      setTaggedUserIds([])
      onClose()
      onSuccess?.()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create thread")
      console.error("[v0] Error creating thread:", err)
    } finally {
      setLoading(false)
    }
  }

  const toggleUserTag = (userId: number) => {
    setTaggedUserIds((prev) => (prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card rounded-lg shadow-lg w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b p-6">
          <h2 className="text-xl font-bold text-foreground">Create Thread</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="size-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Title Input */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter thread title (min 5 characters)"
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              disabled={loading}
            />
          </div>

          {/* Tag Users */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Tag Users (Optional)</label>
            <div className="space-y-2 max-h-40 overflow-y-auto border border-input rounded-md p-3 bg-background">
              {users.length === 0 ? (
                <p className="text-sm text-muted-foreground">No users available</p>
              ) : (
                users.map((user) => (
                  <label key={user.id} className="flex items-center gap-2 cursor-pointer hover:bg-muted p-2 rounded">
                    <input
                      type="checkbox"
                      checked={taggedUserIds.includes(user.id)}
                      onChange={() => toggleUserTag(user.id)}
                      disabled={loading}
                      className="w-4 h-4 rounded border-input"
                    />
                    <span className="text-sm text-foreground">{user.name}</span>
                  </label>
                ))
              )}
            </div>
          </div>

          {/* Error Message */}
          {error && <div className="text-sm text-destructive bg-destructive/10 p-3 rounded">{error}</div>}

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} disabled={loading} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? "Creating..." : "Create Thread"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
