const express = require('express');
const calendarController = require('../controllers/calendarController');

const router = express.Router();

router.get('/events', calendarController.listEvents);
router.post('/events', calendarController.createEvent);

module.exports = router;