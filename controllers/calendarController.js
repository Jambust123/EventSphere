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

    const startDateTime = new Date(req.body.date).toISOString();
    const endDateTime = new Date(new Date(req.body.date).getTime() + 60 * 60 * 1000).toISOString(); // Assuming event duration is 1 hour

    const event = {
      summary: req.body.title,
      location: req.body.location,
      description: req.body.description,
      start: {
        dateTime: startDateTime,
        timeZone: 'America/Los_Angeles',
      },
      end: {
        dateTime: endDateTime,
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