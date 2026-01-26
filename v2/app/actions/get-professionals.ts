"use server"

import { prisma } from "@/lib/prisma"

export async function getProfessionals() {
    try {
        const professionals = await prisma.professionalProfile.findMany({
            include: {
                user: {
                    select: { name: true, image: true }
                },
                services: true
            }
        })
        return professionals.map(p => ({
            id: p.id,
            name: p.user.name || "Unknown Professional",
            specialty: p.specialty,
            image: p.user.image,
            services: p.services
        }))
    } catch (error) {
        console.error("Failed to fetch professionals", error)
        return []
    }
}
