const express = require("express");
const eventController = require("../controllers/eventController");

const router = express.Router();

router.get("/", eventController.getAllEvents);
router.post("/", eventController.createEvent);
router.get("/:id", eventController.getEventById);
router.patch("/:id", eventController.updateEvent);
router.delete("/:id", eventController.deleteEvent);

module.exports = router;