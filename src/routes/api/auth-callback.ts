import type { RequestHandler } from "@sveltejs/kit";

export const get: RequestHandler = async ({ params }) => {
    console.log(params)

    return {
        status: 200,
    };
}