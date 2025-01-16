const pool = require("../db/connection");

const User = {
  create: async (client, userData) => {
    const { username, email, password, role } = userData;
    const result = await client.query(
      "INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *",
      [username, email, password, role || 'user']
    );
    return result.rows[0];
  },

  findAll: async (client) => {
    const result = await client.query("SELECT * FROM users");
    return result.rows;
  },

  findById: async (client, id) => {
    const result = await client.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0];
  },

  findByEmail: async (client, email) => {
    const result = await client.query("SELECT * FROM users WHERE email = $1", [email]);
    return result.rows[0];
  },

  update: async (client, id, userData) => {
    const { username, email, password, role } = userData;
    const result = await client.query(
      "UPDATE users SET username = $1, email = $2, password = $3, role = $4 WHERE id = $5 RETURNING *",
      [username, email, password, role, id]
    );
    return result.rows[0];
  },

  delete: async (client, id) => {
    const result = await client.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
    return result.rows[0];
  },
};

module.exports = User;