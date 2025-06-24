import { getUser } from '@/auth/server'
import AskAiButton from '@/components/AskAiButton'
import NewNoteButton from '@/components/NewNoteButton'
import NoteTextInput from '@/components/NoteTextInput'
import { prisma } from '@/db/prisma'
import React from 'react'

type props = {
  searchParams: Promise<{ [key: string]: string | string }>
}
async function HomePage({ searchParams }: props) {
  const noteIdparam = (await searchParams).noteId
  const user = await getUser()

  const noteId = Array.isArray(noteIdparam) ? noteIdparam![0] : noteIdparam || ""

  const note = await prisma.note.findUnique({
    where: { id: noteId, authorId: user?.id }
  })

  return (
    <div className="flex h-full w-full max-w-6xl mx-auto flex-col items-center justify-start gap-4 p-4 sm:gap-6 sm:p-6">
      <div className='flex w-4 max-w-4 xl justify-end gap-2'>
        <AskAiButton user={user} />
        <NewNoteButton user={user} />
      </div>
      
      <NoteTextInput
        noteId={noteId}
        startingNoteText={note?.text || ""}
      />
    </div>
  )
}

export default HomePage