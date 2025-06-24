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
        <Sidebar className="border-r border-border/40">
            <SidebarContent className="custom-scrollbar px-3 py-4">
                <SidebarGroup>
                    <SidebarGroupLabel className="
                mb-4 
                mt-2 
                text-base
                sm:text-lg 
                font-semibold 
                text-foreground
                px-2
            ">
                        {user ? (
                            "Your Notes"
                        ) : (
                            <div className="text-sm text-muted-foreground leading-relaxed">
                                <Link
                                    href="/login"
                                    className="
                                text-primary 
                                hover:text-primary/80 
                                underline 
                                underline-offset-2
                                font-medium
                                transition-colors
                                duration-200
                            "
                                >
                                    Log in
                                </Link>
                                {" "}to see your notes
                            </div>
                        )}
                    </SidebarGroupLabel>

                    {user && (
                        <div className="space-y-1">
                            <SidebarGroupContents notes={notes} />
                        </div>
                    )}

                    {/* Empty state when no notes */}
                    {user && (!notes || notes.length === 0) && (
                        <div className="
                    px-2 
                    py-8 
                    text-center 
                    text-sm 
                    text-muted-foreground
                ">
                            <div className="mb-2">📝</div>
                            <p>No notes yet</p>
                            <p className="text-xs mt-1">
                                Create your first note to get started
                            </p>
                        </div>
                    )}
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="border-t border-border/40 p-3">
            </SidebarFooter>
        </Sidebar>
    )
}

export default AppSidebar
