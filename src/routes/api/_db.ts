import { v4 as uuidv4 } from "uuid";

const users = [];
let sessions = [];

export function getUserByEmail(email: string): Promise<null | User> {
    const existingUser = users.find(user => user.email === email);
    if (!existingUser) return Promise.resolve(null);
    return Promise.resolve(existingUser);
}

export function registerUser(user: User): Promise<User> {
    const existingUser = users.find(u => u.email === user.email);
    if (existingUser) return Promise.reject(new Error('User already exists'));
    users.push(user);
    return Promise.resolve(user);
}

export function createSession(email: string): Promise<Session> {
    const session = {
        id: uuidv4(),
        email
    };
    sessions.push(session);
    return Promise.resolve(session);
}

export function getSession(id: string): Promise<null | Session> {
    const session = sessions.find(session => session.id === id);
    if (!session) return Promise.resolve(null);
    return Promise.resolve(session);
}

export function removeSession(id: string): Promise<Session> {
    const session = sessions.find(session => session.id === id);
    if (!session) return Promise.reject(new Error('Session not found'));
    sessions = sessions.filter(session => session.id !== id);
    return Promise.resolve(session);
}
