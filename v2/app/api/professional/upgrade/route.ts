import { auth } from "@/auth";
import { prisma } from "@/lib/prisma"; // Assuming a singleton exists or we instantiate
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { accessCode } = body;

        if (!accessCode) {
            return NextResponse.json({ error: "Access code required" }, { status: 400 });
        }

        // Verify Access Code
        const codeRecord = await db.accessCode.findUnique({
            where: { code: accessCode },
        });

        if (!codeRecord) {
            return NextResponse.json({ error: "Invalid access code" }, { status: 400 });
        }

        if (codeRecord.isUsed) {
            // Option: One-time use? Or Multi-use? 
            // User plan said "One-Time Access Code".
            // But if multiple professionals join, we might need a multi-use code or generated codes.
            // For "drop-in", usually Admin generates a code for a specific person.
            return NextResponse.json({ error: "Code already used" }, { status: 400 });
        }

        // Update User Role
        const updatedUser = await db.user.update({
            where: { email: session.user.email },
            data: {
                role: "PROFESSIONAL",
                inviteCodeUsed: accessCode
            },
        });

        // Create Professional Profile if not exists
        await db.professionalProfile.upsert({
            where: { userId: updatedUser.id },
            create: { userId: updatedUser.id, isVerified: true },
            update: { isVerified: true }
        });

        // Mark code as used
        await db.accessCode.update({
            where: { id: codeRecord.id },
            data: { isUsed: true }
        });

        return NextResponse.json({ success: true, role: "PROFESSIONAL" });
    } catch (error) {
        console.error("Upgrade error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
