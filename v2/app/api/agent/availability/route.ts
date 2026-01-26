import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

export const dynamic = 'force-dynamic';

/**
 * @swagger
 * /api/agent/availability:
 *   get:
 *     description: Check available slots for appointments
 *     parameters:
 *       - name: date
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *       - name: professionalId
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of available slots
 */
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const dateStr = searchParams.get("date");
        const professionalId = searchParams.get("professionalId");

        if (!dateStr) {
            return NextResponse.json({ error: "Date parameter is required (YYYY-MM-DD)" }, { status: 400 });
        }

        const date = new Date(dateStr);
        if (isNaN(date.getTime())) {
            return NextResponse.json({ error: "Invalid date format" }, { status: 400 });
        }

        const dayOfWeek = date.getDay(); // 0-6

        // 1. Find Availability Rules
        // If professionalId is provided, filter by it. Otherwise get all (or limit to one for simplicity in agent response)
        const whereClause: any = { dayOfWeek };
        if (professionalId) {
            whereClause.professionalId = professionalId;
        }

        const availabilities = await prisma.availability.findMany({
            where: whereClause,
            include: { professional: { include: { user: true } } }
        });

        if (availabilities.length === 0) {
             return NextResponse.json({
                available: true,
                data: [],
                message: "No professionals available on this day of the week."
            });
        }

        // 2. Find Existing Appointments for that date
        // We need to check the exact date range
        // Start of day in UTC? Or assumes local time?
        // Let's assume the input dateStr is YYYY-MM-DD and we treat it as local day,
        // but DB stores DateTime (UTC).
        // For simplicity in this demo, we'll try to match exact overlap if possible,
        // or just strict string comparison if we stored strings. But we store DateTime.

        // Construct range for the day
        const startOfDay = new Date(dateStr);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(dateStr);
        endOfDay.setHours(23, 59, 59, 999);

        const appointments = await prisma.appointment.findMany({
            where: {
                startTime: {
                    gte: startOfDay,
                    lte: endOfDay
                },
                status: {
                    not: "CANCELLED"
                },
                ...(professionalId ? { professionalId } : {})
            }
        });

        // 3. Compute Slots
        const availableSlots: any[] = [];

        for (const rule of availabilities) {
            // Generate slots for this rule
            // rule.startTime (e.g. "09:00")
            // rule.endTime (e.g. "12:00")

            const slots = generateTimeSlots(dateStr, rule.startTime, rule.endTime);

            // Filter out booked slots
            const freeSlots = slots.filter(slotTime => {
                // Check if this slotTime overlaps with any appointment
                // slotTime is "HH:mm"
                // Appointment has startTime (Date)
                // We need to convert slotTime on dateStr to Date object

                const slotDateTime = new Date(`${dateStr}T${slotTime}:00`);
                // Assume 1 hour default slot duration for availability check
                const slotEndDateTime = new Date(slotDateTime.getTime() + 60 * 60000);

                return !appointments.some((appt: any) => {
                    // Check overlap
                    // Overlap if (StartA < EndB) and (EndA > StartB)
                    return (appt.startTime < slotEndDateTime && appt.endTime > slotDateTime);
                });
            });

            if (freeSlots.length > 0) {
                availableSlots.push({
                    professionalId: rule.professionalId,
                    professionalName: rule.professional.user.name || "Unknown Professional",
                    date: dateStr,
                    slots: freeSlots
                });
            }
        }

        return NextResponse.json({
            available: true,
            data: availableSlots
        });

    } catch (error: any) {
        console.error("Agent availability error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

function generateTimeSlots(dateStr: string, start: string, end: string): string[] {
    const slots = [];
    let current = new Date(`${dateStr}T${start}:00`);
    const endDt = new Date(`${dateStr}T${end}:00`);

    // 60 min intervals
    while (current < endDt) {
        const hours = current.getHours().toString().padStart(2, '0');
        const minutes = current.getMinutes().toString().padStart(2, '0');
        slots.push(`${hours}:${minutes}`);
        current.setHours(current.getHours() + 1);
    }

    return slots;
}
