const express = require("express");
const eventController = require("../controllers/eventController");
const { authenticate, authorize } = require("../middleware/authentication");

const router = express.Router();

router.get("/", eventController.getAllEvents);
router.get("/:id", eventController.getEventById);
router.post("/:id/signup", authenticate, eventController.signUpForEvent);

router.post("/", authenticate, authorize(["staff"]), eventController.createEvent);
router.patch("/:id", authenticate, authorize(["staff"]), eventController.updateEvent);
router.delete("/:id", authenticate, authorize(["staff"]), eventController.deleteEvent);

module.exports = router;