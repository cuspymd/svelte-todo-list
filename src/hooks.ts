import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ request, resolve }) => {
    if (request.query.has("_method")) {
        request.method = request.query.get("_method").toUpperCase();
    }
    return await resolve(request);
}