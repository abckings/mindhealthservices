
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const session = await auth();
        // @ts-ignore
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // @ts-ignore
        const role = session.user.role;
        const userId = session.user.id;

        let whereClause = {};

        if (role === "PROFESSIONAL") {
            const profile = await prisma.professionalProfile.findUnique({
                where: { userId: userId }
            });

            if (!profile) {
                return NextResponse.json({ error: "Professional Profile not found" }, { status: 404 });
            }
            whereClause = { professionalId: profile.id };
        } else {
            // Assume PATIENT (or ADMIN acting as patient for now)
            whereClause = { patientId: userId };
        }

        const appointments = await prisma.appointment.findMany({
            where: whereClause,
            include: {
                patient: {
                    select: { name: true, email: true, image: true }
                },
                professional: {
                    select: { user: { select: { name: true } }, specialty: true } // Include professional details for patients
                },
                service: {
                    select: { name: true, duration: true, price: true }
                }
            },
            orderBy: { startTime: 'asc' }
        });

        // Transform data slightly to match expected frontend structure if needed, or update frontend types.
        // The current frontend uses `patient` and `service`.
        // For patients, they might want to see `professional` name instead of `patient` (themselves).
        // Let's keep the return flexible.

        return NextResponse.json(appointments);
    } catch (error) {
        console.error("Fetch appointments error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
