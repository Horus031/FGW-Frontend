"use client"

import { Button } from "../ui/button"
import { Plus } from "lucide-react"
import { useState } from "react"
import CreateThreadModal from "./CreateThread"

interface ThreadHeaderProps {
  user: {
    id: number
    name: string
    email: string
  }
  onThreadCreated?: () => void
}

export default function ThreadHeader({ user, onThreadCreated }: ThreadHeaderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Threads</h1>
              <p className="text-muted-foreground mt-1">Manage your discussions and tagged conversations</p>
            </div>
            <Button className="gap-2" onClick={() => setIsModalOpen(true)}>
              <Plus className="size-4" />
              New Thread
            </Button>
          </div>
        </div>
      </header>

      <CreateThreadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          setIsModalOpen(false)
          onThreadCreated?.()
        }}
        userId={user.id}
      />
    </>
  )
}
