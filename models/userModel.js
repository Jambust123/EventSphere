const pool = require("../db/connection");

const User = {
	create: async (userData) => {
		const { username, email, password } = userData;
		const result = await pool.query(
			"INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
			[username, email, password]
		);
		return result.rows[0];
	},

	findAll: async () => {
		const result = await pool.query("SELECT * FROM users");
		return result.rows;
	},

	findById: async (id) => {
		const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
		return result.rows[0];
	},

	findByEmail: async (email) => {
		const result = await pool.query("SELECT * FROM users WHERE email = $1", [
			email,
		]);
		return result.rows[0];
	},

	update: async (id, userData) => {
		const { username, email, password } = userData;
		const result = await pool.query(
			"UPDATE users SET username = $1, email = $2, password = $3 WHERE id = $4 RETURNING *",
			[username, email, password, id]
		);
		return result.rows[0];
	},

	delete: async (id) => {
		const result = await pool.query(
			"DELETE FROM users WHERE id = $1 RETURNING *",
			[id]
		);
		return result.rows[0];
	},
};

module.exports = User;
