import { getUser } from '@/auth/server'
import { prisma } from '@/db/prisma'
import React from 'react'

type props = {
  searchParams : Promise<{[key:string]:string | string}>
}
async function HomePage({searchParams}:props) {
  const noteIdparam = (await searchParams).noteId
  const user =  await getUser()

  const noteId = Array.isArray(noteIdparam) ? noteIdparam![0] : noteIdparam || ""

  const note = await prisma.note.findUnique({
    where : {id:noteId,authorId:user?.id} 
  })

  return (
    <div className='flex h-full flex-col items-center gap-4'>
      <div className='flex w-4 max-w-4 xl justify-end gap-2'>
        <AskAiButton />
        <NewNoteButton  user = {user}/>

        
      </div>
      <NoteTextinput
        noteId = {noteId}
        startingNoteText = {note?.text || ""}
      / >
    </div>
  )
}

export default HomePage