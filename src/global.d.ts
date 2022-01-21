/// <reference types="@sveltejs/kit" />

type Todo = {
    uid: string;
    created_at: Date;
    text: string;
    done: boolean;
}

type User = {
    email: string;
    password: string;
}

type Session = {
    id: string;
    email: string;
}

type AuthClient = {
    clientId: string;
    clientSecret: string;
    redirectURI: string;
}

type AuthCredential = {
    email: string;
    accessToken: string;
    refreshToken: string;
    scope: string;
    tokenType: string;
    expiryDate: number;
}