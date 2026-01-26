
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkAvailability() {
    try {
        console.log("--- Services ---");
        const services = await prisma.service.findMany({ include: { professional: true } });
        services.forEach(s => {
            console.log(`Service: ${s.name} (ID: ${s.id})`);
            console.log(`  -> Professional: ${s.professional.userId} (Prof ID: ${s.professional.id})`);
        });

        console.log("\n--- Availability ---");
        const availabilities = await prisma.availability.findMany();
        availabilities.forEach(a => {
            console.log(`Prof ID: ${a.professionalId}, Day: ${a.dayOfWeek}, Time: ${a.startTime} - ${a.endTime}`);
        });

    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

checkAvailability();
