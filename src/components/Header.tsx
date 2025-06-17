import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { shadow } from '@/styles/utils'
import { Button } from './ui/button'
import DarkModeToggle from './DarkModeToggle'
import LogOutButton from './LogOutButton'
import { getUser } from '@/auth/server'
import { SidebarTrigger } from './ui/sidebar'

async function Header() {
    const user = await getUser()
    return (
        <header className='bg-popover relative flex h-24 w-full items-center justify-between  px-3 sm:px-8 '
        style={{
            boxShadow : shadow,
        }}>
            <SidebarTrigger className = "absolute left-1 top-1" />
            <Link className='flex items-end gap-2' href={'/'} >
                <Image
                    src={"/catius.png"} 
                    height={60} 
                    width={60} 
                    className='rounded-full' 
                    alt="logo" 
                    priority 
                />
                <h1 className='flex flex-col pb-1 text-2xl font-semibold leading-6'
                >CatScratch
                    <span>
                         Notes
                    </span>
                </h1>
            </Link>
            <div className='flex gap-4'>
                {
                user?
                <LogOutButton />:
                <>
                <Button asChild className='hidden sm:block'>
                    <Link href = "/sign-up">sign-up</Link>
                </Button>

                <Button asChild variant={"outline"} >
                    <Link href = "/login">Login</Link>
                </Button>

                </>
            }
            <DarkModeToggle />
            </div>
        </header>
    )
}

export default Header