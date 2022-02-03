import type { OAuth2Client, Credentials } from 'google-auth-library';
import type { GetTokenResponse } from 'google-auth-library/build/src/auth/oauth2client';
import { google } from 'googleapis';
import { getAuthCredential, setAuthCredential } from './_db';

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
        refresh_token: authCredential.refreshToken,
        expiry_date: authCredential.expiryDate,
        access_token: authCredential.accessToken,
        token_type: authCredential.tokenType,
        scope: authCredential.scope
    }
}

function toAuthCredential(email: string, credentials: Credentials): AuthCredential {
    return {
        email,
        refreshToken: credentials.refresh_token,
        expiryDate: credentials.expiry_date,
        accessToken: credentials.access_token,
        tokenType: credentials.token_type,
        scope: credentials.scope
    }
}

function createOAuth2Client(): OAuth2Client {
    const authClient = getAuthClient();
    return new google.auth.OAuth2(
        authClient.clientId, authClient.clientSecret, authClient.redirectURI);
}

export async function authorize(email: string): Promise<string | OAuth2Client> {
    const oAuth2Client = createOAuth2Client();
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

export async function updateCredentials(email: string, code: string): Promise<OAuth2Client> {
    const oAuth2Client = createOAuth2Client();
    const res: GetTokenResponse = await oAuth2Client.getToken(code);
    const credentials: Credentials = res.tokens;
    
    setAuthCredential(email, toAuthCredential(email, credentials));
    oAuth2Client.setCredentials(credentials);
    return oAuth2Client;
}
