const express = require('express');
const calendarController = require('../controllers/calendarController');
const { authenticate } = require('../middleware/authentication');
const cors = require('cors');

const router = express.Router();

router.options('*', cors()); 

router.get('/events', authenticate, calendarController.listEvents);
router.post('/events', authenticate, calendarController.createEvent);

module.exports = router;