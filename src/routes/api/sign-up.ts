import { createSession, getUserByEmail, registerUser } from './_db';
import { serialize } from 'cookie';
import bcrypt from 'bcrypt';

export async function post({ body: { email, password } }) {
    const user = await getUserByEmail(email);

    if (user) {
        return {
            status: 409,
            body: {
                message: 'User already exists'
            }
        };
    }

    const saltRounds = 10;
    await registerUser({
        email,
        password: await bcrypt.hash(password, saltRounds)
    });

    return {
        status: 201,
        body: {
            message: 'Sucessfully signed up'
        }
    };
}
