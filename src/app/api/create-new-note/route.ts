import { prisma } from "@/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    if (!userId) {
        return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const { id } = await prisma.note.create({
        data: {
            authorId: userId,
            text: ""
        },

    })
    return NextResponse.json({
        noteId: id
    })
}