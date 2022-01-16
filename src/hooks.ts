import { parse } from "cookie";
import { getSession as getSessionFromApi } from "./routes/api/_db";

import type { Handle, GetSession } from "@sveltejs/kit";

export const handle: Handle = async ({ request, resolve }) => {
    if (request.query.has("_method")) {
        request.method = request.query.get("_method").toUpperCase();
    }

    const cookies = parse(request.headers.cookie || '');

    if (cookies.session_id) {
        const session = await getSessionFromApi(cookies.session_id);
        if (session) {
            request.locals.user = { email: session.email };
            return resolve(request);
        }

    }

    request.locals.user = null;
    return await resolve(request);
}

export const getSession: GetSession = request => {
    return request?.locals?.user
    ? {
        user: {
            email: request.locals.user.email
        }
    }
    : {};
}
