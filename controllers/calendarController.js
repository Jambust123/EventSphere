const { google } = require("googleapis");
const authorize = require("../calendarAuth/googleAuth");

async function listEvents(req, res) {
	const auth = await authorize();
	const calendar = google.calendar({ version: "v3", auth });
	calendar.events.list(
		{
			calendarId: "primary",
			timeMin: new Date().toISOString(),
			maxResults: 10,
			singleEvents: true,
			orderBy: "startTime",
		},
		(err, result) => {
			if (err) return res.status(500).send("The API returned an error: " + err);
			const events = result.data.items;
			if (events.length) {
				res.status(200).json(events);
			} else {
				res.status(404).send("No upcoming events found.");
			}
		}
	);
}

async function createEvent(req, res) {
	const auth = await authorize();
	const calendar = google.calendar({ version: "v3", auth });
	const event = {
		summary: req.body.summary,
		location: req.body.location,
		description: req.body.description,
		start: {
			dateTime: req.body.start,
			timeZone: "America/Los_Angeles",
		},
		end: {
			dateTime: req.body.end,
			timeZone: "America/Los_Angeles",
		},
	};
	calendar.events.insert(
		{
			calendarId: "primary",
			resource: event,
		},
		(err, event) => {
			if (err)
				return res
					.status(500)
					.send("There was an error contacting the Calendar service: " + err);
			res.status(201).json(event.data);
		}
	);
}

module.exports = {
	listEvents,
	createEvent,
};
