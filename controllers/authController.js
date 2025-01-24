const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const pool = require("../db/connection");

const signIn = async (req, res) => {
  let client;
  try {
    const { email, password } = req.body;
    client = await pool.connect();
    const user = await User.findByEmail(client, email);
    if (!user) {
      console.log("User not found with email:", email); 
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Password does not match for user:", email); 
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, userId: user.id }); 
  } catch (error) {
    console.error("Error during sign-in:", error);
    res.status(500).json({ error: "Internal server error." });
  } finally {
    if (client) client.release();
  }
};

module.exports = { signIn };