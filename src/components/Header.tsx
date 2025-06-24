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
        <header 
            className="
                bg-background/95 
                backdrop-blur-sm
                top-0 
                z-50
                relative 
                flex 
                h-16
                sm:h-20
                w-full 
                items-center 
                justify-between 
                border-b 
                border-border/40
                px-4 
                sm:px-6 
                lg:px-8
                transition-all
                duration-200
            "
            style={{
                boxShadow: shadow,
            }}
        >
            {/* Sidebar Trigger - Better positioning */}
            <SidebarTrigger 
                className="
                    absolute 
                    left-2 
                    top-1/2 
                    -translate-y-1/2
                    z-10
                    sm:left-4
                " 
            />
            
            {/* Logo Section - Improved layout */}
            <Link 
                className="
                    flex 
                    items-center 
                    gap-3 
                    ml-12
                    sm:ml-16
                    hover:opacity-80 
                    transition-opacity 
                    duration-200
                " 
                href="/"
            >
                <div className="relative">
                    <Image
                        src="/catius.png"
                        height={48}
                        width={48}
                        className="
                            rounded-full 
                            ring-2 
                            ring-primary/20 
                            transition-transform 
                            duration-200 
                            hover:scale-105
                        "
                        alt="CatScratch Notes logo"
                        priority
                    />
                </div>
                
                <div className="hidden sm:flex flex-col">
                    <h1 className="
                        text-xl 
                        lg:text-2xl 
                        font-bold 
                        leading-tight
                        text-foreground
                        tracking-tight
                    ">
                        CatScratch
                    </h1>
                    <span className="
                        text-sm 
                        lg:text-base 
                        text-muted-foreground 
                        font-medium
                        -mt-1
                    ">
                        Notes
                    </span>
                </div>
                
                {/* Mobile logo text */}
                <h1 className="
                    sm:hidden 
                    text-lg 
                    font-bold 
                    text-foreground
                ">
                    CatScratch
                </h1>
            </Link>
            
            {/* Actions Section - Better spacing and responsive design */}
            <div className="flex items-center gap-2 sm:gap-3">
                {user ? (
                    <div className="flex items-center gap-2 sm:gap-3">
                        <LogOutButton />
                        <DarkModeToggle />
                    </div>
                ) : (
                    <div className="flex items-center gap-2 sm:gap-3">
                        <Button 
                            asChild 
                            size="sm"
                            className="
                                hidden 
                                sm:inline-flex
                                bg-primary 
                                hover:bg-primary/90
                                text-primary-foreground
                                font-medium
                            "
                        >
                            <Link href="/sign-up">Sign Up</Link>
                        </Button>
                        
                        <Button 
                            asChild 
                            variant="outline" 
                            size="sm"
                            className="
                                border-border
                                hover:bg-accent
                                hover:text-accent-foreground
                                font-medium
                            "
                        >
                            <Link href="/login">Login</Link>
                        </Button>
                        
                        <DarkModeToggle />
                    </div>
                )}
            </div>
        </header>
    )
}

export default Header