const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/", userController.createUser);
router.get("/", userController.getUsers);
router.patch("/:id", userController.updateUser);
router.get("/:id", userController.getUserById);
router.delete("/:id", userController.deleteUser);

module.exports = router;