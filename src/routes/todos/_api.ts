import type { Request } from "@sveltejs/kit"
let todos: Todo[] = [];

export const api = (request: Request, todo?: Todo) => {
    let body = {};
    let status = 500;

    switch (request.method.toUpperCase()) {
        case "GET":
            body = todos;
            status = 200;
            break;
        case "POST":
            return {
                status: 303,
                headers: {
                   location: "/"
                }
            }
            break;
        case "DELETE":
            todos = todos.filter(todo => todo.uid !== request.params.uid);
            status = 200;
            break;
    }

    return {
        status,
        body
    }
}