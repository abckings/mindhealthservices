"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"

export async function getDashboardStats() {
    const session = await auth()
    if (!session?.user?.id) throw new Error("Unauthorized")

    // @ts-ignore
    const role = session.user.role
    const userId = session.user.id

    if (role === "PROFESSIONAL") {
        const profile = await prisma.professionalProfile.findUnique({
            where: { userId },
            include: { services: true }
        })

        if (!profile) return null

        // Upcoming Appointments (Next 7 days)
        const nextWeek = new Date()
        nextWeek.setDate(nextWeek.getDate() + 7)

        const upcomingCount = await prisma.appointment.count({
            where: {
                professionalId: profile.id,
                startTime: {
                    gte: new Date(),
                    lt: nextWeek
                },
                status: { not: "CANCELLED" }
            }
        })

        // Total unique patients
        // Prisma doesn't support distinct count directly in count(), so we group by or findMany distinct
        const distinctPatients = await prisma.appointment.findMany({
            where: { professionalId: profile.id },
            distinct: ['patientId'],
            select: { patientId: true }
        })
        const totalPatients = distinctPatients.length

        // Revenue (Total Paid)
        // @ts-ignore
        const payments = await prisma.payment.aggregate({
            where: {
                appointment: {
                    professionalId: profile.id
                },
                status: "PAID"
            },
            _sum: {
                amount: true
            }
        })
        const revenue = payments._sum.amount || 0

        // Recent Activity (Last 5 appointments)
        const recentActivity = await prisma.appointment.findMany({
            where: { professionalId: profile.id },
            orderBy: { startTime: 'desc' },
            take: 5,
            include: {
                patient: {
                    select: { name: true, image: true, email: true }
                },
                service: {
                    select: { name: true }
                }
            }
        })

        return {
            role: "PROFESSIONAL",
            stats: {
                upcomingAppointments: upcomingCount,
                totalPatients,
                revenue
            },
            recentActivity
        }

    } else {
        // Patient View
        // Upcoming Appointments
        const upcomingCount = await prisma.appointment.count({
            where: {
                patientId: userId,
                startTime: { gte: new Date() },
                status: { not: "CANCELLED" }
            }
        })

        // Recent Activity
        const recentActivity = await prisma.appointment.findMany({
            where: { patientId: userId },
            orderBy: { startTime: 'desc' },
            take: 5,
            include: {
                professional: {
                    select: {
                        user: { select: { name: true, image: true } },
                        specialty: true
                    }
                },
                service: {
                    select: { name: true }
                }
            }
        })

        return {
            role: "PATIENT",
            stats: {
                upcomingAppointments: upcomingCount
            },
            recentActivity
        }
    }
}
