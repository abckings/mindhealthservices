"use server"

import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"
import { emailService } from "@/lib/email"

const BookingSchema = z.object({
    date: z.string(), // ISO Date string YYYY-MM-DD
    time: z.string(), // HH:mm
    serviceId: z.string()
})

export async function createBooking(data: z.infer<typeof BookingSchema>) {
    try {
        const session = await auth()
        if (!session?.user || !session.user.id) {
            throw new Error("Unauthorized: Please login to book an appointment")
        }

        // Validate input
        const validated = BookingSchema.parse(data)

        // 1. Fetch Service to get duration and professional
        // If serviceId is "general", "therapy" (mock values), we need to handle them or expect real UUIDs
        // For now, we assume the frontend sends real UUIDs.
        // If the frontend sends "general", we might need a fallback or find a service by name.
        let service = await prisma.service.findUnique({
            where: { id: validated.serviceId },
            include: { professional: true }
        })

        // Fallback for mock frontend values if real ID not found
        if (!service) {
            // Try to find by name or just pick the first service for demo purposes
            // This is to support the legacy/mock frontend without breaking it immediately
            const services = await prisma.service.findMany({
                where: {
                   OR: [
                     { name: { contains: validated.serviceId, mode: 'insensitive' } },
                     { name: { contains: "Consultation" } } // Fallback
                   ]
                },
                include: { professional: true },
                take: 1
            })
            if (services.length > 0) {
                service = services[0]
            } else {
                throw new Error("Service not found")
            }
        }

        // 2. Calculate Start and End Time
        // Combine date (YYYY-MM-DD) and time (HH:mm)
        // Ensure date is just the date part if it comes as ISO full string
        const datePart = validated.date.split('T')[0]
        const startDateTimeStr = `${datePart}T${validated.time}:00`
        const startTime = new Date(startDateTimeStr)

        if (isNaN(startTime.getTime())) {
            throw new Error("Invalid date or time format")
        }

        const endTime = new Date(startTime.getTime() + service.duration * 60000)

        // 3. Create Appointment
        const appointment = await prisma.appointment.create({
            data: {
                patientId: session.user.id,
                professionalId: service.professional.id,
                serviceId: service.id,
                startTime: startTime,
                endTime: endTime,
                status: "PENDING",
                paymentStatus: "PENDING"
            }
        })

        console.log("Booking created:", appointment.id)

        // Send notification (async, don't block)
        if (session.user.email) {
            emailService.sendAppointmentConfirmation(session.user.email, {
                 appointmentId: appointment.id,
                 service: service.name,
                 date: startTime
            }).catch(err => console.error("Failed to send email", err));
        }

        revalidatePath('/dashboard/book')
        return { success: true, appointmentId: appointment.id }

    } catch (error: any) {
        console.error("Booking error:", error)
        throw new Error(error.message || "Failed to create booking")
    }
}
