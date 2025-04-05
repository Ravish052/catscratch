"use client";

import React, { useState } from 'react'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import {toast} from "sonner"
import { useRouter } from 'next/navigation';
import { logOutAction } from '@/actions/users';

function LogOutButton() {
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    
    
    const handleLogout = async()=>{
        setLoading(true)

        
        const errorMessage = await logOutAction()
        if(errorMessage){
            toast.success(
                "You have been successfully logged out."
                );
            router.push('/')
        }else{
            toast.error("Error")
        }
        
        setLoading(false)
    }
    return (
        <Button 
        variant={"outline"}
        onClick={handleLogout}
        disabled = {loading}
        className='w-24'>
            {loading ? <Loader2 className='animate-spin' /> : "Log Out"}</Button>
    )
}

export default LogOutButton

