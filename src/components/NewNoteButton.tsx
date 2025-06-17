"use client"

import { User } from '@supabase/supabase-js'
import { Loader2 } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'
import { toast } from "sonner"
import { createNoteAction } from '@/actions/notes'
type props = {
  user: User | null
}
function NewNoteButton({ user }: props) {
  const router = useRouter()

  const [loading, setLoading] = React.useState(false)

  const handleClickNewNoteButton = async () => {
    if (!user) {
      router.push("/login")
    } else {
      setLoading(true)
      const uuid = uuidv4()
      await createNoteAction(uuid)
      router.push(`/?noteId=${uuid}`)
      toast.success("New note created")
      setLoading(false)
    }
  }
  console.log(user?.email)
  return (
    <Button
      onClick={handleClickNewNoteButton}
      variant="secondary"
      className='"w-24'
      disabled={loading}
    >
      {loading ? <Loader2 className="animate-spin" /> : "new Note"}
    </Button>
  )
}

export default NewNoteButton