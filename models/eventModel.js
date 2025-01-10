const pool = require('../db/connection');

const Event = {
  create: async (client, eventData) => {
    const { title, description, date, location, capacity, price, user_id } = eventData;
    const result = await client.query(
      'INSERT INTO events (title, description, date, location, capacity, price, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [title, description, date, location, capacity, price, user_id]
    );
    return result.rows[0];
  },

  update: async (client, id, eventData) => {
    const { title, description, date, location, capacity, price, user_id } = eventData;
    const result = await client.query(
      'UPDATE events SET title = $1, description = $2, date = $3, location = $4, capacity = $5, price = $6, user_id = $7 WHERE id = $8 RETURNING *',
      [title, description, date, location, capacity, price, user_id, id]
    );
    return result.rows[0];
  },

  delete: async (client, id) => {
    const result = await client.query('DELETE FROM events WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  },

  findById: async (client, id) => {
    const result = await client.query('SELECT * FROM events WHERE id = $1', [id]);
    return result.rows[0];
  },

  findAll: async (client) => {
    const result = await client.query('SELECT * FROM events');
    return result.rows;
  },

  signUp: async (client, eventId, userId) => {
    await client.query('INSERT INTO event_signups (event_id, user_id) VALUES ($1, $2)', [eventId, userId]);
  },
};

module.exports = Event;