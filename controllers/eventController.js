const Event = require('../models/Event');

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.findAll();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createEvent = async (req, res) => {
  try {
    const { title, description, date, location, capacity, price } = req.body;

    if (!title || !description || !date || !location || capacity == null || price == null) {
      return res.status(400).json({
        error: 'Validation error: Missing required fields.',
      });
    }

    const newEvent = await Event.create({ title, description, date, location, capacity, price });
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const event = await Event.findByPk(id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found.' });
    }

    await event.update(updates);

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};