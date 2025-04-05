"use client"

import { Note } from '@prisma/client'
import React from 'react'

type props = {
    notes:Note[]
}
function SidebarGroupContents({notes} : props) {
  return (
    <div>Your Notes here</div>
  )
}

export default SidebarGroupContents