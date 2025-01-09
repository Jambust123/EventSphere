const Event = require('../models/eventModel');

exports.createEvent = async (req, res) => {
    try {
        const { title, description, date, location, capacity, price, user_id } = req.body;

        if (!title || !description || !date || !location || capacity == null || price == null || user_id == null) {
            return res.status(400).json({
                error: "Validation error: Missing required fields.",
            });
        }

        const event = await Event.create({ title, description, date, location, capacity, price, user_id });
        res.status(201).json(event);
    } catch (error) {
        console.error("Error creating event:", error);
        res.status(500).json({ error: error.message });
    }
};

exports.updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, date, location, capacity, price, user_id } = req.body;

        const event = await Event.update(id, { title, description, date, location, capacity, price, user_id });

        if (!event) {
            return res.status(404).json({ error: "Event not found." });
        }

        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;

        const event = await Event.delete(id);

        if (!event) {
            return res.status(404).json({ error: "Event not found." });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getEventById = async (req, res) => {
    try {
        const { id } = req.params;

        const event = await Event.findById(id);

        if (!event) {
            return res.status(404).json({ error: "Event not found." });
        }

        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.findAll();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};