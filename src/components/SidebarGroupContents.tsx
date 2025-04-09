"use client"

import { Note } from '@prisma/client'
import React from 'react'

type props = {
    notes:Note[]
}
function SidebarGroupContents({notes} : props) {
  console.log(notes)
  return (
    <div>Your Notes here</div>
  )
}

export default SidebarGroupContents