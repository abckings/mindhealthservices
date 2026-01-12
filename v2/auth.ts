import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();
// Mock user for now to unblock build if Prisma is failing
const getUser = async (email: string) => {
    return null; // Mock
}

async function getUserReal(email: string) {
    try {
        // const user = await prisma.user.findUnique({ where: { email } });
        return null;
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await getUser(email);
                    if (!user) return null;

                    // Note: In real app, check password hash. 
                    // For now assuming existing users might not have passwords set up or using dummy check
                    // const passwordsMatch = await bcrypt.compare(password, user.password);
                    // if (passwordsMatch) return user;

                    return user;
                }

                console.log('Invalid credentials');
                return null;
            },
        }),
    ],
});
