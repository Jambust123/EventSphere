const request = require("supertest");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index");
const app = require("../app");
const endpoint = require("../endpoints.json");

beforeEach(() => {
  return seed(testData);
});
afterAll(() => {
  return db.end();
});

describe("App", () => {
  it("should respond with a 200 status for the root endpoint", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Welcome to the Event Management API!" });
  });

  it("should respond with a JSON object for the /api endpoint", async () => {
    const response = await request(app).get("/api");
    expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
    expect(response.body).toEqual(endpoint);
  });

  it("should respond with a 200 status and a list of events for the /api/events endpoint", async () => {
    const response = await request(app).get("/api/events");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it("should respond with a 201 status and the created event for the POST /api/events endpoint", async () => {
    const newEvent = {
      title: "New Event",
      description: "Event Description",
      date: "2023-12-31T00:00:00.000Z",
      location: "Location",
      capacity: 100,
      price: "50.00",
      user_id: 1
    };
    const response = await request(app).post("/api/events").send(newEvent);
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(newEvent);
  });

  it("should respond with a 200 status and a list of users for the /api/users endpoint", async () => {
    const response = await request(app).get("/api/users");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it("should respond with a 404 status for an unknown endpoint", async () => {
    const response = await request(app).get("/unknown-endpoint");
    expect(response.status).toBe(404);
  });
});