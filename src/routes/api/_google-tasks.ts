import type { OAuth2Client, Credentials } from 'google-auth-library';
import { google } from 'googleapis';
import { getAuthCredential } from './_db';

const SCOPES = ['https://www.googleapis.com/auth/tasks'];

function getAuthClient(): AuthClient {
    return {
        clientId: process.env.OAUTH_CLIENT_ID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        redirectURI: process.env.OAUTH_REDIRECT_URI
    }
}

function toCredentials(authCredential: AuthCredential): Credentials {
    return {
        refresh_token: authCredential.accessToken,
        expiry_date: authCredential.expiryDate,
        access_token: authCredential.accessToken,
        token_type: authCredential.tokenType,
        scope: authCredential.scope
    }
}

export async function authorize(email: string): Promise<string | OAuth2Client> {
    const authClient = getAuthClient();
    console.log(authClient);
    const oAuth2Client: OAuth2Client = new google.auth.OAuth2(
        authClient.clientId, authClient.clientSecret, authClient.redirectURI);
    const authCredential = await getAuthCredential(email);
    let credentials: Credentials;
    if (authCredential) {
        oAuth2Client.setCredentials(toCredentials(authCredential));
        return oAuth2Client;
    } else {
        return oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES,
            login_hint: email,
            state: email
        });
    }
}


