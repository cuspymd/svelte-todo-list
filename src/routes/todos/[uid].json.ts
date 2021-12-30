import type { RequestHandler } from "@sveltejs/kit";

export const get: RequestHandler = (request) => {
    return {
        status: 200,
        body: request.params.uid
    }
}