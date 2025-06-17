"use client"

import React from 'react'
import {User} from "@supabase/supabase-js"
type props = {
    user : User | null
}

function AskAiButton({user}:props) {
    console.log(user?.email)
  return (
    <div>AskAiButton</div>
  )
}

export default AskAiButton