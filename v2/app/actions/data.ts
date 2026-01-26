"use server"

import { prisma } from "@/lib/prisma"

export async function getServices() {
    try {
        const services = await prisma.service.findMany({
            include: {
                professional: {
                    include: {
                        user: {
                            select: { name: true }
                        }
                    }
                }
            }
        });
        return services;
    } catch (error) {
        console.error("Failed to fetch services", error);
        return [];
    }
}
