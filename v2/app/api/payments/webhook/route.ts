import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { emailService } from "@/lib/email";

// Mock webhook handler for Razorpay
// In real life, this receives events from Razorpay (signature verification required)
export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Mock Razorpay payload structure usually has { event: "order.paid", payload: { ... } }
        const event = body;

        if (event.event === 'order.paid') {
            const order = event.payload.order.entity;

            // 1. Find Payment record
            const payment = await prisma.payment.findFirst({
                where: { externalId: order.id }
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
