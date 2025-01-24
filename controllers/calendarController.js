const { google } = require("googleapis");
const authorize = require("../calendarAuth/googleAuth");

async function listEvents(req, res) {
  try {
    const auth = await authorize();
    const calendar = google.calendar({ version: 'v3', auth });
    calendar.events.list(
      {
        calendarId: 'primary',
        timeMin: new Date().toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime',
      },
      (err, result) => {
        if (err) return res.status(500).send('There was an error contacting the Calendar service: ' + err);
        const events = result.data.items;
        if (events.length) {
          res.status(200).json(events);
        } else {
          res.status(200).send('No upcoming events found.');
        }
      }
    );
  } catch (error) {
    console.error("Error listing events:", error);
    res.status(500).json({ error: "Internal server error." });
  }
}

async function createEvent(req, res) {
  try {
    const auth = await authorize();
    const calendar = google.calendar({ version: 'v3', auth });
    const event = {
      summary: req.body.summary || "Default Summary",
      location: req.body.location || "Default Location",
      description: req.body.description || "Default Description",
      start: {
        dateTime: req.body.start || new Date().toISOString(),
        timeZone: 'America/Los_Angeles',
      },
      end: {
        dateTime: req.body.end || new Date(new Date().getTime() + 60 * 60 * 1000).toISOString(),
        timeZone: 'America/Los_Angeles',
      },
    };
    console.log("Creating event with data:", event);
    calendar.events.insert(
      {
        calendarId: 'primary',
        resource: event,
      },
      (err, event) => {
        if (err) {
          console.error('Error contacting the Calendar service:', err);
          return res.status(500).send('There was an error contacting the Calendar service: ' + err);
        }
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