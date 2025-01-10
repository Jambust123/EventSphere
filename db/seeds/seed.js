const { users, events } = require("../data/test-data/index");
const pool = require("../connection");

const seed = async () => {

  await pool.query("DELETE FROM event_signups");
  await pool.query("DELETE FROM events");
  await pool.query("DELETE FROM users");

  await pool.query("ALTER SEQUENCE users_id_seq RESTART WITH 1");
  await pool.query("ALTER SEQUENCE events_id_seq RESTART WITH 1");

  const userInsertPromises = users.map((user) =>
    pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id",
      [user.username, user.email, user.password]
    )
  );

  const userResults = await Promise.all(userInsertPromises);

  const userIdMap = userResults.reduce((acc, result, index) => {
    acc[users[index].username] = result.rows[0].id;
    return acc;
  }, {});

  const mappedEvents = events.map((event) => ({
    ...event,
    user_id: userIdMap[event.username],
  }));

  const eventInsertPromises = mappedEvents.map((event) =>
    pool.query(
      "INSERT INTO events (title, description, date, location, capacity, price, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [event.title, event.description, event.date, event.location, event.capacity, event.price, event.user_id]
    )
  );

  await Promise.all(eventInsertPromises);
};

module.exports = seed;