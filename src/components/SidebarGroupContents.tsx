"use client"

import { Note } from '@prisma/client'
import React, { useEffect, useMemo } from 'react'
import { SearchIcon } from 'lucide-react'
import { Sidebar as SideBarGroupContentShadCN, SidebarMenu, SidebarMenuItem } from '@/components/ui/sidebar'
import { Input } from './ui/input'
import Fuse from 'fuse.js'
import SelectNoteButton from './SelectNoteButton'
import DeleteNoteButton from './DeleteNoteButton'

type props = {
  notes: Note[]
}
function SidebarGroupContents({ notes }: props) {
  const [searchText, setSearchText] = React.useState("")
  const [localNotes, setLocalNotes] = React.useState(notes)

  useEffect(() => {
    setLocalNotes(notes)
  }, [notes])

  const fuse = useMemo(() => {
    return new Fuse(localNotes, {
      keys: ['text'],
      threshold: 0.3,
    })
  }, [localNotes])

  const filteredNotes = searchText ? fuse.search(searchText).map((result: { item: any }) => result.item)
    : localNotes;

  const deleteNoteLocally = (noteId: string) => {
    setLocalNotes((prevNotes) => prevNotes.filter(note => note.id !== noteId))
  }

  return (
    <SideBarGroupContentShadCN>
      <div className='relative flex items-center'>
        <SearchIcon className='absolute left-2 size-2' />
        <Input
          className='bg-muted pl-8'
          placeholder='Search notes...'
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          autoFocus
        />
      </div>

      <SidebarMenu className='mt-4'>
        {filteredNotes.map((note) =>
          <SidebarMenuItem key={note.id} className="group/item">
            <SelectNoteButton note={note} />

            <DeleteNoteButton noteId={note.id}
              deleteNoteLocally={deleteNoteLocally}
            />
          </SidebarMenuItem>)}
      </SidebarMenu>
    </SideBarGroupContentShadCN>
  )
}

export default SidebarGroupContents