const request = require("supertest");
const express = require("express");
const eventRoutes = require("../routes/eventRoutes");
const pool = require("../db/connection");

const { authenticate, authorize } = require("../middleware/authentication");

jest.mock("../middleware/authentication", () => ({
	authenticate: jest.fn((req, res, next) => {
		if (req.headers.authorization === "Bearer valid_token") {
			req.user = { id: "1", role: "staff" };
			next();
		} else {
			res.status(401).json({ error: "Unauthorized" });
		}
	}),
	authorize: jest.fn((roles) => (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			return res
				.status(403)
				.json({ error: "Forbidden: You do not have access to this resource." });
		}
		next();
	}),
}));

const app = express();
app.use(express.json());
app.use("/api/events", eventRoutes);

describe("Event Routes", () => {
	let client;

	beforeEach(async () => {
		jest.resetModules();
		try {
			client = await pool.connect();
		} catch (error) {
			console.error("Error getting connection from pool:", error);
		}
	});

	afterEach(async () => {
		if (client) {
			try {
				await client.release();
			} catch (error) {
				console.error("Error releasing connection to pool:", error);
			}
		}
	});

	afterAll(async () => {
		await pool.end(); 
	});

	it("should create an event with valid token and role", async () => {
		const newEvent = {
			title: "New Event",
			description: "Event Description",
			date: "2023-12-31",
			location: "Location",
			capacity: 100,
			price: 50.0,
		};

		const response = await request(app)
			.post("/api/events")
			.send(newEvent)
			.set("Authorization", "Bearer valid_token");

		expect(response.status).toBe(201);
		expect(response.body).toHaveProperty("title", "New Event");
	});

	it("should not create an event without proper role", async () => {
		// Change the role to "user" for this test case
		authenticate.mockImplementationOnce((req, res, next) => {
			if (req.headers.authorization === "Bearer valid_token") {
				req.user = { id: "1", role: "user" }; // Change role to "user"
				next();
			} else {
				res.status(401).json({ error: "Unauthorized" });
			}
		});

		const newEvent = {
			title: "New Event",
			description: "Event Description",
			date: "2023-12-31",
			location: "Location",
			capacity: 100,
			price: 50.0,
		};

		const response = await request(app)
			.post("/api/events")
			.send(newEvent)
			.set("Authorization", "Bearer valid_token");

		expect(response.status).toBe(403);
	});
});
