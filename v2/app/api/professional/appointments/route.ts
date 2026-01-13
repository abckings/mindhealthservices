
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const session = await auth();
        // @ts-ignore
        if (!session?.user?.email || session.user.role !== "PROFESSIONAL") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const profile = await prisma.professionalProfile.findUnique({
            where: { userId: session.user.id }
        });

        if (!profile) {
            return NextResponse.json({ error: "Profile not found" }, { status: 404 });
        }

        const appointments = await prisma.appointment.findMany({
            where: { professionalId: profile.id },
            include: {
                patient: {
                    select: { name: true, email: true, image: true }
                },
                service: {
                    select: { name: true, duration: true }
                }
            },
            orderBy: { startTime: 'asc' }
        });

        return NextResponse.json(appointments);
    } catch (error) {
        console.error("Fetch appointments error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
