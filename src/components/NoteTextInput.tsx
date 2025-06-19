"use client"
import useNote from '@/hooks/useNote';
import { debounceTimeout } from '@/lib/constants';
import { useSearchParams } from 'next/navigation';
import React, { ChangeEvent, useEffect } from 'react'

type props ={
    noteId : string;
    startingNoteText : string;
}
function NoteTextInput({noteId, startingNoteText}:props) {

    let updateTimeout : NodeJS.Timeout;

    const noteIdParams = useSearchParams().get("noteId") || "";
    const {noteText, setNoteText} = useNote();

    useEffect(()=>{
        if (noteIdParams === noteId){
            setNoteText(startingNoteText);
        }
    },[ startingNoteText,noteIdParams, noteId, setNoteText ])

    const handleUpdateNote = (e : ChangeEvent<HTMLTextAreaElement>) =>{
        const text = e.target.value;
        setNoteText(text)

        clearTimeout(updateTimeout);
        updateTimeout = setTimeout(() => {
            updatenoteAction(noteId, text)
        }, debounceTimeout)
    }
  return (
    <textarea 
        value = {noteText}
        onChange = {(e) => handleUpdateNote(e) }
        placeholder='Type your note here...'
        className='custom-scrollbar mb-4 h-full max-w-4xl resize -none borderp-4 placeholder:text-muted-foreground focus-visible:ring-0 focus visible:ring -offset-0'
    />
  )
}

export default NoteTextInput

function updatenoteAction(noteId: string, text: string) {
    console.log("Update note action called with", noteId, text);
    throw new Error('Function not implemented.');
}
