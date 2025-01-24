const fs = require("fs");
const { google } = require("googleapis");
const path = require("path");

const SCOPES = ["https://www.googleapis.com/auth/calendar"];
const TOKEN_PATH = path.join(__dirname, "token.json");

async function authorize() {
  const client_id = process.env.GOOGLE_CLIENT_ID;
  const client_secret = process.env.GOOGLE_CLIENT_SECRET;
  const redirect_uris = [process.env.GOOGLE_REDIRECT_URI];
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  try {
    const token = fs.readFileSync(TOKEN_PATH, "utf8");
    oAuth2Client.setCredentials(JSON.parse(token));
    console.log("Token loaded from file and set.");
  } catch (error) {
    console.error("Error loading token from file:", error);
    throw new Error("Token not found or invalid.");
  }

  return oAuth2Client;
}

module.exports = authorize;