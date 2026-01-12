import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { professionals, patients, secret } = body;

        // Validate Secret
        // In production, use process.env.SEED_SECRET
        if (secret !== "temp-secret-key") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // 1. Create Patients
        for (const p of patients) {
            const hashedPassword = await bcrypt.hash(p.password, 10);
            await prisma.user.upsert({
                where: { email: p.email },
                update: {},
                create: {
                    name: p.name,
                    email: p.email,
                    password: hashedPassword,
                    role: "PATIENT"
                }
            });
        }

        // 2. Create Professionals
        for (const prof of professionals) {
            const hashedPassword = await bcrypt.hash(prof.password, 10);

            const user = await prisma.user.upsert({
                where: { email: prof.email },
                update: {},
                create: {
                    name: prof.name,
                    email: prof.email,
                    password: hashedPassword,
                    role: "PROFESSIONAL"
                }
            });

            const profile = await prisma.professionalProfile.upsert({
                where: { userId: user.id },
                update: {
                    bio: prof.bio,
                    specialty: prof.specialty,
                    isVerified: true
                },
                create: {
                    userId: user.id,
                    bio: prof.bio,
                    specialty: prof.specialty,
                    isVerified: true
                }
            });

            // Services
            for (const svc of prof.services) {
                // Simple creation (can duplicate if run multiple times, ideally query first)
                // For seeding data, we might want to clear existing services or check
                await prisma.service.create({
                    data: {
                        professionalId: profile.id,
                        name: svc["name"],
                        duration: svc["duration"],
                        price: svc["price"]
                    }
                });
            }

            // Availability
            for (const slot of prof.availability) {
                await prisma.availability.create({
                    data: {
                        professionalId: profile.id,
                        dayOfWeek: slot["dayOfWeek"],
                        startTime: slot["startTime"],
                        endTime: slot["endTime"]
                    }
                });
            }
        }

        return NextResponse.json({ success: true, message: "Database seeded successfully" });
    } catch (error) {
        console.error("Seeding error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
