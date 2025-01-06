require('dotenv').config();

const {
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_DIALECT
} = process.env;

module.exports = {
  development: {
    username: DB_USER,
    password: DB_PASSWORD || null, // Allow null for local development
    database: `${DB_NAME}_development`, // Append `_development` to DB_NAME
    host: DB_HOST || 'localhost',
    port: DB_PORT || 5432,
    dialect: DB_DIALECT || 'postgres',
    logging: console.log, // Enable SQL query logging in development
  },
  test: {
    username: DB_USER,
    password: DB_PASSWORD || null,
    database: `${DB_NAME}_test`,
    host: DB_HOST || 'localhost',
    port: DB_PORT || 5432,
    dialect: DB_DIALECT || 'postgres',
    logging: false, // Disable logging for tests
  },
  production: {
    username: DB_USER,
    password: DB_PASSWORD || null,
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT || 5432,
    dialect: DB_DIALECT || 'postgres',
    logging: false, // Disable logging in production
  },
};
