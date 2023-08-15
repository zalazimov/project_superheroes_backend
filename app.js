const cors = require("cors");
const express = require("express");
const morgan = require("morgan");

const heroesController = require("./controller/heroController");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/heroes", heroesController);

app.get("/", (req, res) => {
  res.send("Welcome to Superhero Central");
});
app.get("/notfound", (req, res) => {
  res.status(404).send("invalid request");
});

app.get("*", (req, res) => {
  res.status(404).send("Page not found");
});

module.exports = app;
