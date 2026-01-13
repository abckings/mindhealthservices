import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe"; // This is our mock
import { z } from "zod";

const CheckoutSchema = z.object({
    appointmentId: z.string(),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { appointmentId } = CheckoutSchema.parse(body);

        // 1. Fetch Appointment and Service details
        const appointment = await prisma.appointment.findUnique({
            where: { id: appointmentId },
            include: { service: true }
        });

        if (!appointment) {
            return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
        }

        if (appointment.paymentStatus === "PAID") {
            return NextResponse.json({ error: "Appointment already paid" }, { status: 400 });
        }

        // 2. Create Stripe PaymentIntent
        // Amount should be in smallest currency unit (e.g. cents)
        const amount = Math.round(appointment.service.price * 100);

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: appointment.service.currency.toLowerCase(),
        });

        // 3. Save Payment Record
        await prisma.payment.create({
            data: {
                appointmentId: appointment.id,
                amount: appointment.service.price,
                currency: appointment.service.currency,
                externalId: paymentIntent.id,
                status: "PENDING"
            }
        });

        return NextResponse.json({
            clientSecret: paymentIntent.client_secret,
            paymentId: paymentIntent.id
        });

    } catch (error: any) {
        console.error("Checkout error:", error);
        return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
    }
}
