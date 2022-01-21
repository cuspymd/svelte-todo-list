import { authorize } from './_google-tasks';

export async function post(request) {
    if (!request?.locals?.user) {
        return {
            status: 401
        }
    }

    const email: string = request.locals.user.email;
    const result = await authorize(email);
    if (typeof result === 'string') {
        console.log(result);
        return {
            status: 200,
            body: {
                url: result
            }
        };
    }
    // TODO: do sync

    return {
        status: 201,
        body: {
            message: 'Sucessfully signed up'
        }
    };
}
