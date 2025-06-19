"use client"
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from '@/components/ui/alert-dialog'
import React, { useTransition } from 'react'
import { AlertDialogHeader, AlertDialogFooter } from './ui/alert-dialog'
import { Button } from './ui/button'
import { Loader2, Trash2 } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import { DeleteNoteAction } from '@/actions/notes'

type Props = {
  noteId: string
  deleteNoteLocally: (noteId: string) => void
}
function DeleteNoteButton({ noteId, deleteNoteLocally }: Props) {

  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const noteIdParam = useSearchParams().get('noteId')
  
  const handleDeleteNote = () => {
    startTransition(async () => {
      const { errorMessage } = await DeleteNoteAction(noteId)

      if (errorMessage) {
        toast.success("Deleted Successfully")
        deleteNoteLocally(noteId)
        if (noteIdParam === noteId) {
          router.replace("/")
        }
      }else{
        toast.error("Failed to delete note")
      }

    })
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="absolute-right-2 top-1/2 -translate-y-1/2 size-7 p-0 opacity-0 group-hover/item:opacity-100 [&_svg]:size-3"
          variant="ghost"
        >
          <Trash2 />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete this note ?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your note
            from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteNote} className="w-24 bg-destructive text-destructive-foreground hover:bg-destructive/90 ">
            {isPending ? <Loader2 className="animate-spin" /> : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog >
  )
}

export default DeleteNoteButton