import { NextResponse } from "next/server";
import { z } from "zod";

const BookAppointmentSchema = z.object({
    patientName: z.string(),
    date: z.string(),
    time: z.string(),
    reason: z.string().optional(),
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
 *               patientName:
 *                 type: string
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
        const validated = BookAppointmentSchema.parse(body);

        // In a real app, this would save to DB
        console.log("Agent booked appointment:", validated);

        return NextResponse.json({
            success: true,
            bookingId: "bk_" + Math.random().toString(36).substr(2, 9),
            message: "Appointment confirmed successfully",
            details: validated
        });
    } catch (error) {
        return NextResponse.json({ error: "Invalid booking request" }, { status: 400 });
    }
}
