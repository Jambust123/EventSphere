const fs = require("fs");
const { google } = require("googleapis");
const path = require("path");

const SCOPES = ["https://www.googleapis.com/auth/calendar"];

async function authorize(code) {
    const client_id = process.env.GOOGLE_CLIENT_ID;
    const client_secret = process.env.GOOGLE_CLIENT_SECRET;
    const redirect_uris = [process.env.GOOGLE_REDIRECT_URI];
    const oAuth2Client = new google.auth.OAuth2(
        client_id,
        client_secret,
        redirect_uris[0]
    );

    if (code) {
        const { tokens } = await oAuth2Client.getToken(code);
        oAuth2Client.setCredentials(tokens);
        console.log("Token obtained and set.");
        return oAuth2Client;
    }

    const tokenJson = process.env.GOOGLE_TOKEN_JSON;
    if (tokenJson) {
        try {
            const token = JSON.parse(tokenJson);
            console.log("Loaded token from environment variable:", token);
            oAuth2Client.setCredentials(token);
            return oAuth2Client;
        } catch (error) {
            console.error("Error parsing token JSON:", error);
            throw new Error("Invalid token JSON format.");
        }
    }

    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: SCOPES,
    });
    console.log("Authorize this app by visiting this url:", authUrl);
    return authUrl;
}

module.exports = authorize;