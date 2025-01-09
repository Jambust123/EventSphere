const express = require("express");
const cors = require("cors");
const eventRoutes = require("./routes/eventRoutes");
const userRoutes = require("./routes/userRoutes");
const endpoint = require("./endpoints.json");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the Event Management API!" });
});

app.get("/api", (req, res) => {
  res.status(200).json(endpoint);
});

app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    return res.status(err.status).send({ msg: err.msg });
  }
  return res.status(500).send({ msg: "Internal Server Error" });
});

module.exports = app;