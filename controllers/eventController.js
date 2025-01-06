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
    const { title, description, date, location, capacity } = req.body;
    const newEvent = await Event.create({ title, description, date, location, capacity });
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};