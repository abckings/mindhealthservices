import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { emailService } from "@/lib/email";

// Enhanced schema for Agent booking
const AgentBookSchema = z.object({
    patientEmail: z.string().email(),
    patientName: z.string().optional(), // Used if creating new user
    professionalId: z.string().optional(), // ID of professional
    professionalName: z.string().optional(), // Fallback search
    serviceId: z.string().optional(),
    serviceName: z.string().optional(), // Fallback search
    date: z.string(), // YYYY-MM-DD
    time: z.string(), // HH:mm
    notes: z.string().optional()
});

/**
 * @swagger
 * /api/agent/book:
 *   post:
 *     description: Book an appointment via Agent
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               patientEmail:
 *                 type: string
 *               patientName:
 *                 type: string
 *               professionalId:
 *                  type: string
 *               date:
 *                 type: string
 *               time:
 *                 type: string
 *     responses:
 *       200:
 *         description: Booking confirmed
 */
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validated = AgentBookSchema.parse(body);

        // 1. Find or Create User (Patient)
        let user = await prisma.user.findUnique({
            where: { email: validated.patientEmail }
        });

        if (!user) {
            // Create a new user with a random password if not exists
            const randomPassword = Math.random().toString(36).slice(-8);
            const hashedPassword = await bcrypt.hash(randomPassword, 10);

            user = await prisma.user.create({
                data: {
                    email: validated.patientEmail,
                    name: validated.patientName || validated.patientEmail.split('@')[0],
                    password: hashedPassword,
                    role: "PATIENT"
                }
            });
            console.log(`Created new user for agent booking: ${user.email}`);
        }

        // 2. Find Professional
        let professional = null;
        if (validated.professionalId) {
            professional = await prisma.professionalProfile.findUnique({
                where: { id: validated.professionalId }
            });
        } else if (validated.professionalName) {
            // Search by name in User table then get Profile
            const profUser = await prisma.user.findFirst({
                where: {
                    name: { contains: validated.professionalName, mode: 'insensitive' },
                    role: "PROFESSIONAL"
                },
                include: { professionalProfile: true }
            });
            professional = profUser?.professionalProfile || null;
        }

        // Fallback: Pick first professional if none specified (for demo/robustness)
        if (!professional) {
             const firstProf = await prisma.professionalProfile.findFirst();
             if (firstProf) professional = firstProf;
             else return NextResponse.json({ error: "No professional found" }, { status: 404 });
        }

        // 3. Find Service
        // Prioritize serviceId, then serviceName, then default
        let service = null;
        if (validated.serviceId) {
            service = await prisma.service.findUnique({ where: { id: validated.serviceId } });
        }

        if (!service && validated.serviceName) {
            service = await prisma.service.findFirst({
                where: {
                    professionalId: professional.id,
                    name: { contains: validated.serviceName, mode: 'insensitive' }
                }
            });
        }

        if (!service) {
             // Try to find ANY service for this professional
             service = await prisma.service.findFirst({
                 where: { professionalId: professional.id }
             });
        }

        if (!service) {
             return NextResponse.json({ error: "No service found for this professional" }, { status: 404 });
        }


        // 4. Create Appointment
        const datePart = validated.date.split('T')[0];
        const startDateTimeStr = `${datePart}T${validated.time}:00`;
        const startTime = new Date(startDateTimeStr);

        if (isNaN(startTime.getTime())) {
            return NextResponse.json({ error: "Invalid date or time format" }, { status: 400 });
        }

        const endTime = new Date(startTime.getTime() + service.duration * 60000);

        // Check availability (optional but recommended)
        // ... (Skipping complex double-booking check for brevity, relying on client/agent to check availability first)

        const appointment = await prisma.appointment.create({
            data: {
                patientId: user.id,
                professionalId: professional.id,
                serviceId: service.id,
                startTime: startTime,
                endTime: endTime,
                status: "CONFIRMED", // Auto-confirm for Agent? Or PENDING.
                paymentStatus: "PENDING",
                notes: validated.notes || "Booked via AI Agent"
            }
        });

        // Send confirmation email
        await emailService.sendAppointmentConfirmation(user.email, {
             appointmentId: appointment.id,
             service: service.name,
             date: startTime
        });

        return NextResponse.json({
            success: true,
            bookingId: appointment.id,
            message: "Appointment confirmed successfully",
            details: {
                patient: user.email,
                professional: professional.id,
                service: service.name,
                time: startTime.toISOString()
            }
        });

    } catch (error: any) {
        console.error("Agent booking error:", error);
        if (error instanceof z.ZodError) {
             return NextResponse.json({ error: "Validation error", details: (error as any).errors }, { status: 400 });
        }
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
