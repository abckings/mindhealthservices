import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { razorpay } from "@/lib/razorpay"; // This is our mock
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

        // 2. Create Razorpay Order
        // Amount should be in smallest currency unit (paise)
        const amount = Math.round(appointment.service.price * 100);

        const order = await razorpay.orders.create({
            amount,
            currency: appointment.service.currency.toUpperCase(),
        });

        // 3. Save Payment Record
        await prisma.payment.create({
            data: {
                appointmentId: appointment.id,
                amount: appointment.service.price,
                currency: appointment.service.currency,
                provider: "RAZORPAY",
                externalId: order.id,
                status: "PENDING"
            }
        });

        return NextResponse.json({
            orderId: order.id,
            amount: order.amount,
            currency: order.currency
        });

    } catch (error: any) {
        console.error("Checkout error:", error);
        return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
    }
}
