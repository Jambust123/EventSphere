const fs = require("fs");
const { google } = require("googleapis");
require('dotenv').config();

const SCOPES = ["https://www.googleapis.com/auth/calendar"];
const TOKEN_PATH = "token.json";

const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

const code = '4/0ASVgi3Kli91pXW05KuuNmWo8evKZkmvjMbBqX2MW82Z4a-fMrZipPaa99PtDf274hSajeQ'; // Replace with your actual code

oAuth2Client.getToken(code, (err, token) => {
  if (err) return console.error("Error retrieving access token", err);
  oAuth2Client.setCredentials(token);
  fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
    if (err) return console.error(err);
    console.log("Token stored to", TOKEN_PATH);
  });
});