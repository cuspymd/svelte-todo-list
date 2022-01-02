import type { RequestHandler } from "@sveltejs/kit";
import { api } from "./_api"

export const get: RequestHandler = (request) => {
    return api(request);
}

export const post: RequestHandler<{}, FormData> = (request) => {
    return api(request, {
        text: request.body.get("text"),
        created_at: new Date(),
        done: false
    })
    
}