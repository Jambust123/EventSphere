const { Pool } = require('pg');
const ENV = process.env.NODE_ENV || 'development';
require('dotenv').config({
  path: `${__dirname}/../.env.${ENV}`,
});

const config = {};

if (ENV === 'production') {
  config.connectionString = process.env.DATABASE_URL;
  config.ssl = {
    rejectUnauthorized: false,
  };
} else {
  config.connectionString = process.env.PGDATABASE;
}

if (!config.connectionString) {
  throw new Error('PGDATABASE or DATABASE_URL not set');
}

const pool = new Pool(config);

pool.connect((err, client, release) => {
  if (err) {
    console.error('Error acquiring client', err.stack);
  } else {
    console.log('Database connected successfully');
    release();
  }
});

module.exports = pool;