
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function checkUser(email, password) {
    try {
        console.log(`Checking user: ${email}`);
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            console.log('User not found in database.');
            return;
        }

        console.log('User found:', user.email, 'Role:', user.role);
        console.log('Stored Hash:', user.password);

        const match = await bcrypt.compare(password, user.password);
        console.log('Password match:', match);
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

// Check the default seed user
checkUser('dr.mock1@example.com', 'password123');
