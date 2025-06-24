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
  value={noteText}
  onChange={(e) => handleUpdateNote(e)}
  placeholder="Start writing your note..."
  className="
    w-full 
    h-full 
    max-w-4xl 
    p-6 
    mb-4
    resize-none 
    rounded-xl 
    border-0
    bg-white 
    shadow-sm 
    ring-1 
    ring-gray-200
    text-gray-900 
    text-base
    leading-relaxed
    placeholder:text-gray-400 
    focus:ring-2 
    focus:ring-blue-500
    focus:shadow-md
    dark:bg-gray-900 
    dark:ring-gray-700 
    dark:text-gray-100 
    dark:placeholder:text-gray-500
    dark:focus:ring-blue-400
    transition-all 
    duration-200 
    ease-in-out
    custom-scrollbar
  "
/>
  )
}

export default NoteTextInput

function updatenoteAction(noteId: string, text: string) {
    console.log("Update note action called with", noteId, text);
    throw new Error('Function not implemented.');
}
