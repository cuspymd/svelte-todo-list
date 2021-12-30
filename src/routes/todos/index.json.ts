import type { RequestHandler } from "@sveltejs/kit";

let todos: Todo[] = [];

export const get: RequestHandler = () => {
    return {
        status: 200,
        body: todos
    }
}

export const post: RequestHandler<{}, FormData> = (request) => {
    todos.push({
        text: request.body.get("text"),
        created_at: new Date(),
        done: false
    })
    
    return {
        status: 303,
        headers: {
            location: "/"
        }
    }
}