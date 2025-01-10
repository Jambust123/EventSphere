const fs = require("fs");
const { google } = require("googleapis");
const readline = require("readline");
const path = require("path");

const CREDENTIALS_PATH = path.join(__dirname, "credentials.json");
const TOKEN_PATH = path.join(__dirname, "token.json");

const SCOPES = ["https://www.googleapis.com/auth/calendar"];

async function authorize() {
    const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH));
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id,
        client_secret,
        redirect_uris[0]
    );

    if (fs.existsSync(TOKEN_PATH)) {
        const token = fs.readFileSync(TOKEN_PATH);
        oAuth2Client.setCredentials(JSON.parse(token));
        return oAuth2Client;
    }

    return getAccessToken(oAuth2Client);
}

function getAccessToken(oAuth2Client) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: SCOPES,
    });
    console.log("Authorize this app by visiting this url:", authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question("Enter the code from that page here: ", (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
            if (err) return console.error("Error retrieving access token", err);
            oAuth2Client.setCredentials(token);
            fs.writeFileSync(TOKEN_PATH, JSON.stringify(token));
            console.log("Token stored to", TOKEN_PATH);
        });
    });
}

module.exports = authorize;