import type { RequestHandler } from "@sveltejs/kit";

export const get: RequestHandler = () => {
    return {
        status: 200,
        body: "Hello from the API"
    }
}

export const post: RequestHandler<{}, FormData> = (request) => {
    console.log(request.body.get("text"))
}