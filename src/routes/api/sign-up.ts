import { getUserByEmail, registerUser } from './_db';
import bcrypt from 'bcryptjs';

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

    const saltRounds = 5;
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
