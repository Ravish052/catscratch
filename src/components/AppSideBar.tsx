import { getUser } from "@/auth/server"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
} from "@/components/ui/sidebar"

import { prisma } from "@/db/prisma"
import { Note } from "@prisma/client"
import Link from "next/link"
import SidebarGroupContents from "./SidebarGroupContents"

async function AppSidebar() {

    const user = await getUser()
    let notes: Note[] = []

    if (user) {
        notes = await prisma.note.findMany({
            where: {
                authorId: user.id
            },
            orderBy: {
                updatedAt: "desc"
            }
        })
    }
    return (
        <Sidebar>

            <SidebarContent className="custom-scrollbar">
                <SidebarGroup>
                    <SidebarGroupLabel className="mb-2 mt-2 text-lg">
                        {user ? "Your Notes" : <p>
                            <Link href="/login" className="underlined">
                                Log in
                            </Link>{" "}
                            "to see your Notes"
                        </p>}
                    </SidebarGroupLabel>
                    {user && <SidebarGroupContents notes = {notes} />}
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}

export default AppSidebar
