/// <reference types="@sveltejs/kit" />

type Todo = {
    uid: string;
    created_at: Date;
    text: string;
    done: boolean;
}

type User = {
    email: string;
    password?: string;
}

type Session = {
    id: string;
    email: string;
}
