import type { Request } from "@sveltejs/kit"
let todos: Todo[] = [];

export const api = (request: Request) => {
    let body = {};
    let status = 500;

    switch (request.method.toUpperCase()) {
        case "GET":
            body = todos;
            status = 200;
            break;
        case "POST":
            break;
    }

    return {
        status,
        body
    }
}