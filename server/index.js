const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;

app.use(cors());

const physicians = require("./physicians.json");
const appointments = require("./appointments.json");

app.get("/", (req, res) => {
  res.send("API server");
});

app.get("/physicians", (req, res) => {
  res.json(physicians);
});

/**
 * accepts id, and date
 */
app.get("/appointments", (req, res) => {
  const id = req.query.id;
  if (id) {
    const appointment = appointments[id];
    if (appointment) {
      res.status(200).json(appointment);
    } else {
      res.status(404).send(`Appointment with id: ${id} is not found`);
    }
  } else {
    res.status(400).send(`Required parameter "id" not found!`);
  }
});

app.listen(port, () => console.log("listening on port 3001"));
