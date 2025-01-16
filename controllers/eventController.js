const Event = require("../models/eventModel");
const User = require("../models/userModel");
const pool = require("../db/connection");

const createEvent = async (req, res) => {
  let client;
  try {
    client = await pool.connect();
    const { title, description, date, location, capacity, price } = req.body;
    const user_id = req.user.id;
    const eventData = {
      title,
      description,
      date,
      location,
      capacity,
      price,
      user_id,
    };
    const event = await Event.create(client, eventData);
    res.status(201).json(event);
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ error: "Internal server error." });
  } finally {
    if (client) client.release();
  }
};

const updateEvent = async (req, res) => {
  let client;
  try {
    client = await pool.connect();
    const { id } = req.params;
    const updates = req.body;
    const event = await Event.update(client, id, updates);
    if (!event) {
      return res.status(404).json({ error: "Event not found." });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    if (client) client.release();
  }
};

const deleteEvent = async (req, res) => {
  let client;
  try {
    client = await pool.connect();
    const { id } = req.params;
    const event = await Event.delete(client, id);
    if (!event) {
      return res.status(404).json({ error: "Event not found." });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    if (client) client.release();
  }
};

const getEventById = async (req, res) => {
  let client;
  try {
    client = await pool.connect();
    const { id } = req.params;
    const event = await Event.findById(client, id);
    if (!event) {
      return res.status(404).json({ error: "Event not found." });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    if (client) client.release();
  }
};

const getAllEvents = async (req, res) => {
  let client;
  try {
    client = await pool.connect();
    const events = await Event.findAll(client);
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    if (client) client.release();
  }
};

const signUpForEvent = async (req, res) => {
  let client;
  try {
    client = await pool.connect();
    const { id } = req.params;
    const { userId } = req.body;
    const event = await Event.findById(client, id);
    if (!event) {
      return res.status(404).json({ error: "Event not found." });
    }
    const user = await User.findById(client, userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    await Event.signUp(client, id, userId);
    res.status(200).json({ message: "User signed up for event successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    if (client) client.release();
  }
};

module.exports = {
  createEvent,
  updateEvent,
  deleteEvent,
  getEventById,
  getAllEvents,
  signUpForEvent,
};