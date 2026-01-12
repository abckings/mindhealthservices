import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

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
        const codeRecord = await prisma.accessCode.findUnique({
            where: { code: accessCode },
        });

        if (!codeRecord) {
            return NextResponse.json({ error: "Invalid access code" }, { status: 400 });
        }

        if (codeRecord.isUsed) {
            return NextResponse.json({ error: "Code already used" }, { status: 400 });
        }

        // Update User Role
        const updatedUser = await prisma.user.update({
            where: { email: session.user.email },
            data: {
                role: "PROFESSIONAL",
                inviteCodeUsed: accessCode
            },
        });

        // Create Professional Profile if not exists
        await prisma.professionalProfile.upsert({
            where: { userId: updatedUser.id },
            create: { userId: updatedUser.id, isVerified: true },
            update: { isVerified: true }
        });

        // Mark code as used
        await prisma.accessCode.update({
            where: { id: codeRecord.id },
            data: { isUsed: true }
        });

        return NextResponse.json({ success: true, role: "PROFESSIONAL" });
    } catch (error) {
        console.error("Upgrade error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
