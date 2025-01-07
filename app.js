process.env.NODE_ENV = process.env.NODE_ENV || 'development';
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');
const eventController = require('./controllers/eventController');

const app = express();
app.use(bodyParser.json());

app.get('/api/events', eventController.getAllEvents);
app.post('/api/events', eventController.createEvent);
app.patch('/api/events/:id', eventController.updateEvent);

let server;

(async () => {
  try {
    console.log('Connecting to the database...');
    await sequelize.authenticate();
    console.log('Database connected successfully.');

    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: true });
      console.log('Database models synchronized.');
    } else {
      console.log('Skipping database synchronization in production.');
    }

    const PORT = process.env.PORT || 5000;
    server = app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  } catch (error) {
    console.error('Error connecting to the database:', error);
    process.exit(1);
  }
})();

process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled rejection at promise:', promise, 'reason:', reason);
  process.exit(1);
});

module.exports = { app, server };
