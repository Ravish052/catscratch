"use server"
import { createClient } from "@/auth/server"
import { prisma } from "@/db/prisma"
import { handleError } from "@/lib/utils"
import { redirect } from "next/navigation"

export const loginAction = async (email: string, password: string) => {
    try {
        const supabase = await createClient()
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password
        })
        if (error) throw error
        
        redirect('/dashboard')
    } catch (error) {
        return handleError(error)
    }
}

export const signUpAction = async (email: string, password: string) => {
    try {
        const supabase = await createClient()
        const { data, error } = await supabase.auth.signUp({
            email,
            password
        })
        if (error) throw error
        
        const userId = data.user?.id
        if(!userId) throw new Error("Error Signing Up")
       
        await prisma.user.create({
            data: {
                id: userId,
                email,
            }
        })
        
        return { errorMessage: null }
    } catch (error) {
        return handleError(error)
    }
}

export const logOutAction = async () => {
    try {
        const supabase = await createClient()
        const { error } = await supabase.auth.signOut()
        if (error) throw error
        
        // Redirect after logout
        redirect('/login')
    } catch (error) {
        return handleError(error)
    }
}