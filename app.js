const express = require("express");
const cors = require("cors");
const eventRoutes = require("./routes/eventRoutes");
const userRoutes = require("./routes/userRoutes");
const calendarRoutes = require('./routes/calendarRoutes');
const authRoutes = require('./routes/authRoutes');
const endpoint = require("./endpoints.json");

const app = express();

app.use(cors({
  origin: 'http://localhost:4000', 
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the Event Management API! use /api endpoint to see all available endpoints" });
});

app.get("/api", (req, res) => {
  res.status(200).json(endpoint);
});

app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);
app.use('/api/calendar', calendarRoutes);
app.use('/api/auth', authRoutes);

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    return res.status(err.status).send({ msg: err.msg });
  }
  return res.status(500).send({ msg: "Internal Server Error" });
});

module.exports = app;