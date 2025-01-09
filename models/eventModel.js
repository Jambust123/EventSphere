const pool = require('../db/connection');

const Event = {
  create: async (eventData) => {
    const { title, description, date, location, capacity, price, user_id } = eventData;
    const result = await pool.query(
      "INSERT INTO events (title, description, date, location, capacity, price, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [title, description, date, location, capacity, price, user_id]
    );
    return result.rows[0];
  },

  update: async (id, eventData) => {
    const { title, description, date, location, capacity, price, user_id } = eventData;
    const result = await pool.query(
      "UPDATE events SET title = $1, description = $2, date = $3, location = $4, capacity = $5, price = $6, user_id = $7 WHERE id = $8 RETURNING *",
      [title, description, date, location, capacity, price, user_id, id]
    );
    return result.rows[0];
  },

  delete: async (id) => {
    const result = await pool.query("DELETE FROM events WHERE id = $1 RETURNING *", [id]);
    return result.rows[0];
  },

  findById: async (id) => {
    const result = await pool.query("SELECT * FROM events WHERE id = $1", [id]);
    return result.rows[0];
  },

  findAll: async () => {
    const result = await pool.query("SELECT * FROM events");
    return result.rows;
  }
};

module.exports = Event;