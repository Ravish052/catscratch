"use server"

import { getUser } from "@/auth/server"
import { prisma } from "@/db/prisma"
import { handleError } from "@/lib/utils"

export const updateNoteAction = async (noteId: string, text: string) => {
    try {
        const user = await getUser()
        if (!user) {
            throw new Error("You must be logged in to update a note")
        }
        await prisma.note.update({
            where: { id: noteId },
            data: { text }
        })
        return { errorMessage: null }
    } catch (error) {
        return handleError(error)
    }
}

export const DeleteNoteAction = async (noteId: string) => {
    try {
        const user = await getUser()
        if (!user) {
            throw new Error("You must be logged in to create a note")
        }
        await prisma.note.delete({
            where: {
                id: noteId,
                authorId: user.id,
            }
        })
        return { errorMessage: null }
    } catch (error) {
        return handleError(error)
    }
}

export const CreateNoteAction = async (noteId: string) => {
    try {
        const user = await getUser()
        if (!user) {
            throw new Error("You must be logged in to create a note")
        }
        await prisma.note.create({
            data: {
                id: noteId,
                authorId: user.id,
                text: ""
            }
        })
        return { errorMessage: null }
    } catch (error) {
        return handleError(error)
    }
}

/* export const askAIAboutNotesAction = async (questions: string[], response: string[]) => {
 
        const user = await getUser()
        if (!user) {
            throw new Error("You must be logged in to ask AI questions")
        }
        const notes = await prisma.note.findMany({
            where: {
                authorId: user.id,
            }, orderBy: { createdAt: "desc" },
            select: {
                text: true,
                createdAt: true,
                updatedAt: true,
            }
        })

        if (notes.length === 0) {
            return "You have no notes to ask about."
        }
        const formatedNotes = notes.map(note =>

            `Text : ${note.text}
        Created At: ${note.createdAt.toLocaleString()}
        Updated At: ${note.updatedAt.toLocaleString()}`.trim()
        ).join("\n")

        const prompt = [{
            role : "developer",
            content : 
            `You are a helpful assistant that answers questions about a user's notes.
            Assume all questions are related to the user's notes.
            Make sure that your answers are not too verbose and you speak succintly,
            your response MUST be formatted in clean, valid HTML with proper structure.
            Use tags like <p>, <strong>, <em>, <ul>, <li>, <h1> to <h6> and <br> when appropriate.
            Do NOT wrap the entire response in a single <p> tag unless it's a single paragraph.

            Rendered like this in JSX:
            <p dangerouslySetHTML = {{__html : YOUR_RESPONSE}} />
            here are the user's notes :
            ${formatedNotes}
             `
        }]

        for (let i = 0; i < questions.length; i++) {
            prompt.push({
                role: "user",
                content: questions[i]
            })
            if (response.length > i) {
                prompt.push({
                    "role": "assistant", content: response[i]
                })
            }
        }
        return { errorMessage: null }

} */

export const askAIAboutNotesAction = async (questions: string[], responses: string[]) => {
    const user = await getUser()
    console.log(responses)
    if (!user) {
        throw new Error("You must be logged in to ask AI questions")
    }

    const notes = await prisma.note.findMany({
        where: { authorId: user.id },
        orderBy: { createdAt: "desc" },
        select: {
            text: true,
            createdAt: true,
            updatedAt: true,
        },
    })

    if (notes.length === 0) {
        return "You have no notes to ask about."
    }

    const latestQuestion = questions[questions.length - 1]

    // Return a mock HTML response
    return `
    <div>
      <p><strong>Question:</strong> ${latestQuestion}</p>
      <p><em>AI is still being integrated.</em> Here's a placeholder response.</p>
      <ul>
        <li>This is where the AI-generated answer will go.</li>
        <li>Your notes will be analyzed to answer questions.</li>
      </ul>
      <p>Stay tuned!</p>
    </div>
  `;
}
