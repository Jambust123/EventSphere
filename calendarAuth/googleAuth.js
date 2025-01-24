const fs = require("fs");
const { google } = require("googleapis");
const path = require("path");

const TOKEN_PATH = path.join(__dirname, "token.json");

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
        fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens));
        console.log("Token stored to", TOKEN_PATH);
        return oAuth2Client;
    }

    const tokenJson = process.env.GOOGLE_TOKEN_JSON;
    if (tokenJson) {
        const token = JSON.parse(tokenJson);
        oAuth2Client.setCredentials(token);
        return oAuth2Client;
    }

    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: SCOPES,
    });
    console.log("Authorize this app by visiting this url:", authUrl);
}

module.exports = authorize;