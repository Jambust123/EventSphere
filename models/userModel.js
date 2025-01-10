const pool = require("../db/connection");

const User = {
	create: async (client, userData) => {
		const { username, email, password } = userData;
		const result = await client.query(
			"INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
			[username, email, password]
		);
		return result.rows[0];
	},

	findAll: async (client) => {
		const result = await client.query("SELECT * FROM users");
		return result.rows;
	},

	findById: async (client, id) => {
		const result = await client.query("SELECT * FROM users WHERE id = $1", [
			id,
		]);
		return result.rows[0];
	},

	findByEmail: async (client, email) => {
		const result = await client.query("SELECT * FROM users WHERE email = $1", [
			email,
		]);
		return result.rows[0];
	},

	update: async (client, id, userData) => {
		const { username, email, password } = userData;
		const result = await client.query(
			"UPDATE users SET username = $1, email = $2, password = $3 WHERE id = $4 RETURNING *",
			[username, email, password, id]
		);
		return result.rows[0];
	},

	delete: async (client, id) => {
		const result = await client.query(
			"DELETE FROM users WHERE id = $1 RETURNING *",
			[id]
		);
		return result.rows[0];
	},
};

module.exports = User;
