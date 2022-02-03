import type { RequestHandler } from "@sveltejs/kit";
import type { OAuth2Client } from "google-auth-library";
import { updateCredentials } from './_google-tasks';

export const get: RequestHandler = async ({ query }) => {
    const email: string = query.get('state');
    const code: string = query.get('code');

    const oAuth2Client: OAuth2Client = await updateCredentials(email, code);
    // TODO: do sync
    return {
        status: 200,
    };
}