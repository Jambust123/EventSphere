const { Pool } = require('pg');
const ENV = process.env.NODE_ENV || 'development';
require('dotenv').config({
  path: `${__dirname}/../.env.${ENV}`,
});

console.log(`Environment: ${ENV}`);
console.log(`PGDATABASE: ${process.env.PGDATABASE}`);
console.log(`DATABASE_URL: ${process.env.DATABASE_URL}`);

const config = {};

if (ENV === 'production') {
  config.connectionString = process.env.PGDATABASE || process.env.DATABASE_URL;
  config.max = 2;
} else {
  config.connectionString = process.env.PGDATABASE;
}

if (!config.connectionString) {
  throw new Error('PGDATABASE or DATABASE_URL not set');
}

module.exports = new Pool(config);