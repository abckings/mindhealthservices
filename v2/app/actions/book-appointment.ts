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

const AvailabilitySchema = z.object({
    date: z.string(),
    serviceId: z.string()
})

export async function getAvailableSlots(data: z.infer<typeof AvailabilitySchema>) {
    try {
        const { date, serviceId } = data
        console.log("Fetching slots for:", { date, serviceId })

        // Parse "YYYY-MM-DD" strictly as local time
        // new Date("YYYY-MM-DD") is UTC, which can shift the day if local TZ is behind UTC (e.g. USA)
        // We split and use the constructor new Date(y, mIndex, d) which uses Local Time
        const [year, month, day] = date.split('-').map(Number)
        const dateObj = new Date(year, month - 1, day)

        const dayOfWeek = dateObj.getDay()
        console.log("Computed day of week:", dayOfWeek)

        // 1. Get Service & Professional
        let service = await prisma.service.findUnique({
            where: { id: serviceId },
            include: { professional: true }
        })

        // Fallback for mock/demo values if using seeds that might default to "general" or user input
        if (!service) {
            const services = await prisma.service.findMany({
                where: {
                    OR: [
                        { name: { contains: serviceId, mode: 'insensitive' } },
                        { name: { contains: "Consultation" } }
                    ]
                },
                include: { professional: true },
                take: 1
            })
            if (services.length > 0) service = services[0]
        }

        if (!service) throw new Error("Service not found")

        console.log(`Checking availability for Professional ID: ${service.professional.id}`)

        // 2. Get Professional's Availability for this day
        // Use findMany to support split shifts (e.g. Morning + Evening)
        const availabilities = await prisma.availability.findMany({
            where: {
                professionalId: service.professional.id,
                dayOfWeek: dayOfWeek
            }
        })
        console.log("availabilities found:", availabilities)

        if (!availabilities || availabilities.length === 0) {
            return [] // Not working today
        }

        const now = new Date()
        const slots: string[] = []
        const durationMs = service.duration * 60 * 1000 // duration in minutes to ms

        // Iterate over EACH availability window for the day
        for (const availability of availabilities) {
            // Range: availability start to end on that specific date
            const startDateTime = new Date(`${date.split('T')[0]}T${availability.startTime}:00`)
            const endDateTime = new Date(`${date.split('T')[0]}T${availability.endTime}:00`)

            if (startDateTime < now && endDateTime < now) {
                continue; // This window has passed
            }

            // Log details for debugging
            console.log(`Checking booked appointments between ${startDateTime.toISOString()} and ${endDateTime.toISOString()}`)

            // Important: We must fetch appointments that overlap with the ENTIRE availability window.
            // But we iterate slot by slot inside the code.
            // The query below fetches ALL appointments in this window.
            const bookedAppointments = await prisma.appointment.findMany({
                where: {
                    professionalId: service.professional.id,
                    status: { not: "CANCELLED" },
                    // Check for overlap with the availability window
                    startTime: { lt: endDateTime },
                    endTime: { gt: startDateTime }
                }
            })

            console.log(`Found ${bookedAppointments.length} existing appointments in range`)

            // DEBUG: Check if there are ANY for this professional on this day, regardless of time
            if (bookedAppointments.length === 0) {
                const allDay = await prisma.appointment.findMany({
                    where: {
                        professionalId: service.professional.id,
                        status: { not: "CANCELLED" },
                        startTime: {
                            gte: new Date(year, month - 1, day), // start of local day
                            lt: new Date(year, month - 1, day + 1) // end of local day
                        }
                    }
                })
                console.log("DEBUG: All appointments for this professional on this day:", allDay.length)
                allDay.forEach(a => console.log(`  > ${a.startTime.toISOString()} - ${a.endTime.toISOString()}`))
            }

            bookedAppointments.forEach(b => console.log(`  - Booked: ${b.startTime.toISOString()} - ${b.endTime.toISOString()}`))

            let currentSlot = new Date(startDateTime)

            while (currentSlot.getTime() + durationMs <= endDateTime.getTime()) {
                const slotEnd = new Date(currentSlot.getTime() + durationMs)

                // Check if overlaps with any booked appointment
                const isBooked = bookedAppointments.some(appt => {
                    const apptStart = new Date(appt.startTime)
                    const apptEnd = new Date(appt.endTime)
                    const overlaps = (currentSlot < apptEnd && slotEnd > apptStart)

                    // Debug log for each check
                    if (overlaps) {
                        console.log(`  ⚠️  Slot ${currentSlot.toISOString()} - ${slotEnd.toISOString()} OVERLAPS with booking ${apptStart.toISOString()} - ${apptEnd.toISOString()}`)
                    }

                    return overlaps
                })

                const timeString = currentSlot.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })

                if (!isBooked && currentSlot > now) {
                    console.log(`  ✓ Slot ${timeString} is available`)
                    // Avoid duplicates if windows overlap (unlikely but safe)
                    if (!slots.includes(timeString)) {
                        slots.push(timeString)
                    }
                } else if (isBooked) {
                    console.log(`  ✗ Slot ${timeString} is BLOCKED`)
                } else {
                    console.log(`  ✗ Slot ${timeString} is in the past`)
                }

                currentSlot = new Date(currentSlot.getTime() + durationMs)
            }
        }

        // Sort slots chronologically
        return slots.sort()

    } catch (error) {
        console.error("Get slots error:", error)
        return []
    }
}

export async function createBooking(data: z.infer<typeof BookingSchema>) {
    try {
        const session = await auth()
        if (!session?.user || !session.user.id) {
            throw new Error("Unauthorized: Please login to book an appointment")
        }

        // Validate input
        const validated = BookingSchema.parse(data)

        // 1. Fetch Service to get duration and professional
        let service = await prisma.service.findUnique({
            where: { id: validated.serviceId },
            include: { professional: true }
        })

        // Fallback for mock frontend values if real ID not found
        if (!service) {
            // Try to find by name or just pick the first service for demo purposes
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

        // 2.5 Double Booking Check
        const overlappingAppointment = await prisma.appointment.findFirst({
            where: {
                professionalId: service.professional.id,
                status: { not: "CANCELLED" },
                OR: [
                    {
                        startTime: { lt: endTime },
                        endTime: { gt: startTime }
                    }
                ]
            }
        })

        if (overlappingAppointment) {
            throw new Error("This slot is already booked. Please choose another time.")
        }

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

        revalidatePath('/dashboard/appointments')
        revalidatePath('/dashboard/book')
        return { success: true, appointmentId: appointment.id }

    } catch (error: any) {
        console.error("Booking error:", error)
        throw new Error(error.message || "Failed to create booking")
    }
}
