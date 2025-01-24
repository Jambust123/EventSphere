const { google } = require("googleapis");
const authorize = require("../calendarAuth/googleAuth");

async function createEvent(req, res) {
  try {
    const auth = await authorize();
    const calendar = google.calendar({ version: 'v3', auth });
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
    calendar.events.insert(
      {
        calendarId: 'primary',
        resource: event,
      },
      (err, event) => {
        if (err) return res.status(500).send('There was an error contacting the Calendar service: ' + err);
        res.status(201).json(event.data);
      }
    );
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ error: "Internal server error." });
  }
}

module.exports = {
  listEvents,
  createEvent,
};