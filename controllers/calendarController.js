const { google } = require("googleapis");
const authorize = require("../calendarAuth/googleAuth");

async function listEvents(req, res) {
  try {
    const auth = await authorize();
    const calendar = google.calendar({ version: "v3", auth });
    const events = await calendar.events.list({
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    });
    res.json(events.data.items);
  } catch (error) {
    console.error("Error listing events:", error);
    res.status(500).send("Error listing events");
  }
}

module.exports = { listEvents };