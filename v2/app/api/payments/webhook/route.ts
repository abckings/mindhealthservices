import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { emailService } from "@/lib/email";

// Mock webhook handler for Stripe
// In real life, this receives events from Stripe
export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Mock event structure
        const event = body;

        if (event.type === 'payment_intent.succeeded') {
            const paymentIntent = event.data.object;

            // 1. Find Payment record
            const payment = await prisma.payment.findFirst({
                where: { externalId: paymentIntent.id }
            });

            if (payment) {
                // 2. Update Payment Status
                await prisma.payment.update({
                    where: { id: payment.id },
                    data: { status: "PAID" }
                });

                // 3. Update Appointment Status
                const appointment = await prisma.appointment.update({
                    where: { id: payment.appointmentId },
                    data: {
                        paymentStatus: "PAID",
                        status: "CONFIRMED"
                    },
                    include: { patient: true, service: true }
                });

                // 4. Send Confirmation Email
                await emailService.sendAppointmentConfirmation(appointment.patient.email, {
                    patientName: appointment.patient.name,
                    service: appointment.service.name,
                    date: appointment.startTime,
                    price: payment.amount
                });
            }
        }

        return NextResponse.json({ received: true });
    } catch (error) {
        console.error("Webhook error:", error);
        return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
    }
}
