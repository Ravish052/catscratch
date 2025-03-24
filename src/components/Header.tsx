import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { shadow } from '@/styles/utils'

function Header() {
    return (
        <header className='relative flex h-24 w-full items-center justify-between bg-popover px-3 small px-8 '
        style={{
            boxShadow : shadow
        }}>
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
        </header>
    )
}

export default Header