"use client"

import { useState, createContext } from "react";


type NoteProviderContextType = {
    noteText: string;
    setNoteText: (noteText: string) => void;
}

export const NoteProviderContext = createContext<NoteProviderContextType>({
    noteText: "",
    setNoteText: () => { }
})

function NoteProvider({ children }: { children: React.ReactNode }) {
    const [noteText, setnoteText] = useState("")

    return (
        <NoteProviderContext.Provider value={{ noteText: noteText, setNoteText: setnoteText }}>
            {children}
        </NoteProviderContext.Provider>
    )
}

export default NoteProvider

