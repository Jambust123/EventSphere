const User = require('../models/userModel');

exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: "Missing required fields." });
    }
    const user = await User.create({ username, email, password });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const user = await User.update(id, updates);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.delete(id);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
};