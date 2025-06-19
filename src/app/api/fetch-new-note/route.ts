import { prisma } from "@/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    if (!userId) {
        return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const note = await prisma.note.findFirst({
       where :{
        authorId: userId
       },
       orderBy: {
           createdAt: 'desc'
       },
       select: {
           id: true
       }

    })
    return NextResponse.json({
        newestNoteId: note?.id
    })
}