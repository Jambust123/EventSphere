const User = require('../models/userModel');
const pool = require('../db/connection');

exports.createUser = async (req, res) => {
  let client;
  try {
    client = await pool.connect();
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: "Missing required fields." });
    }
    const user = await User.create(client, { username, email, password });
    res.status(201).json(user);
  } catch (error) {
    console.error("Error creating user:", error); 
    res.status(500).json({ error: "Internal server error." });
  } finally {
    if (client) client.release();
  }
};

exports.getUsers = async (req, res) => {
  let client;
  try {
    client = await pool.connect();
    const users = await User.findAll(client);
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: error.message });
  } finally {
    if (client) client.release();
  }
};

exports.updateUser = async (req, res) => {
  let client;
  try {
    client = await pool.connect();
    const { id } = req.params;
    const updates = req.body;
    const user = await User.update(client, id, updates);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  } finally {
    if (client) client.release();
  }
};

exports.getUserById = async (req, res) => {
  let client;
  try {
    client = await pool.connect();
    const { id } = req.params;
    const user = await User.findById(client, id);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  } finally {
    if (client) client.release();
  }
};

exports.deleteUser = async (req, res) => {
  let client;
  try {
    client = await pool.connect();
    const { id } = req.params;
    const user = await User.delete(client, id);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  } finally {
    if (client) client.release();
  }
};