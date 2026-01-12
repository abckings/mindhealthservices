import { NextResponse } from "next/server";
import { z } from "zod";

// Schema for checking availability
const CheckAvailabilitySchema = z.object({
    date: z.string().optional(),
    professionalId: z.string().optional(),
});

/**
 * @swagger
 * /api/agent/availability:
 *   get:
 *     description: Check available slots for appointments
 *     parameters:
 *       - name: date
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: List of available slots
 */
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");

    // Mock response for Agent
    const availableSlots = [
        {
            date: date || new Date().toISOString().split('T')[0],
            slots: ["09:00", "10:00", "14:00"],
            professional: "Dr. Raj"
        }
    ];

    return NextResponse.json({
        available: true,
        data: availableSlots
    });
}
