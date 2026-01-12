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
            where: { userId: session.user.id },
            include: { availability: true }
        });

        if (!profile) {
            return NextResponse.json({ error: "Profile not found" }, { status: 404 });
        }

        return NextResponse.json(profile.availability);
    } catch (error) {
        console.error("Fetch availability error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await auth();
        // @ts-ignore
        if (!session?.user?.email || session.user.role !== "PROFESSIONAL") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        // Expecting body to be an array of { dayOfWeek, startTime, endTime }
        const availabilityData = body;

        if (!Array.isArray(availabilityData)) {
            return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
        }

        const profile = await prisma.professionalProfile.findUnique({
            where: { userId: session.user.id }
        });

        if (!profile) {
            return NextResponse.json({ error: "Profile not found" }, { status: 404 });
        }

        // Transaction to replace availability
        await prisma.$transaction([
            prisma.availability.deleteMany({
                where: { professionalId: profile.id }
            }),
            prisma.availability.createMany({
                data: availabilityData.map((slot: any) => ({
                    professionalId: profile.id,
                    dayOfWeek: slot.dayOfWeek,
                    startTime: slot.startTime,
                    endTime: slot.endTime
                }))
            })
        ]);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Save availability error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
