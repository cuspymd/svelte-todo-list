import { v4 as uuidv4 } from "uuid";
import PrismaClient from "$lib/prisma";

const prisma = new PrismaClient();

export function getUserByEmail(email: string): Promise<null | User> {
    return prisma.user.findUnique({
        where: { email }
    });
}

export async function registerUser(user: User): Promise<User> {
    const existingUser = await prisma.user.findUnique({
        where: { email: user.email }
    });

    if (existingUser) throw new Error('User already exists');
    return prisma.user.create({ data: user });
}

export function createSession(email: string): Promise<Session> {
    const session = {
        id: uuidv4(),
        email
    };

    return prisma.session.upsert({
        where: {
            email
        },
        update: {
            id: session.id
        },
        create: session
    });
}

export function getSession(id: string): Promise<null | Session> {
    return prisma.session.findUnique({ where: { id } });
}

export function removeSession(id: string): Promise<Session> {
    return prisma.session.delete({ where: { id } });
}

export function getAuthCredential(email: string): Promise<null | AuthCredential> {
    return prisma.authCredential.findUnique({ where: { email } });
}

export function setAuthCredential(email: string, authCredential: AuthCredential): Promise<AuthCredential> {
    return prisma.authCredential.upsert({
        where: {
            email
        },
        update: authCredential,
        create: authCredential
    })
}