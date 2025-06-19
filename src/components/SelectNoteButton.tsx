"use client"

import useNote from '@/hooks/useNote'
import { Note } from '@prisma/client'
import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { SidebarMenuButton } from './ui/sidebar'
import { Link } from 'lucide-react'

type props = {
  note: Note

}
function SelectNoteButton({ note }: props) {
  const noteId = useSearchParams().get('noteId') || ""

  const { noteText: selectedNoteText } = useNote()
  const [shouldUseGlobalNoteText, setShouldUseGlobalNoteText] = React.useState<boolean>(false)
  const [localNoteText, setLocalNoteText] = React.useState<string>(note.text)

  useEffect(() => {
    if (noteId === note.id) {
      setShouldUseGlobalNoteText(true)
    } else {
      setShouldUseGlobalNoteText(false)
    }
  }, [noteId, note.id])

  useEffect(() => {
    if (shouldUseGlobalNoteText) {
      setLocalNoteText(selectedNoteText)
    }
  }, [selectedNoteText, shouldUseGlobalNoteText])

  const blankNoteText = "EMPTY NOTE"

  let noteText = localNoteText || blankNoteText

  if (shouldUseGlobalNoteText) {
    noteText = selectedNoteText || blankNoteText
  }
  return (

    <SidebarMenuButton
      asChild
      className={`items-start gap-0 pr-12 ${note.id === noteId ? "bg-sidebar-accent/50" : ""
        }`}
    >
      <Link
        href = {`/notes?noteId=${note.id}`}
        className = "flex h-fit flex-col"
      >
        <p className = "w-full overflow-hidden truncate text-ellepsis whitespace-nowrap">
          {noteText}
        </p>

        <p>
          {note.updatedAt.toLocaleDateString()}
        </p>


      </Link>

    </SidebarMenuButton>

  )
}

export default SelectNoteButton