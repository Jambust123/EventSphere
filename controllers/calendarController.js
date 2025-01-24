// filepath: /Ubuntu/home/jambust123/gradProject/BE/controllers/calendarController.js
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

async function createEvent(req, res) {
  try {
    const auth = await authorize();
    const calendar = google.calendar({ version: "v3", auth });
    const event = {
      summary: req.body.summary,
      location: req.body.location,
      description: req.body.description,
      start: {
        dateTime: req.body.start,
        timeZone: 'America/Los_Angeles',
      },
      end: {
        dateTime: req.body.end,
        timeZone: 'America/Los_Angeles',
      },
    };
    const response = await calendar.events.insert({
      calendarId: 'primary',
      resource: event,
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).send("Error creating event");
  }
}

module.exports = { listEvents, createEvent };