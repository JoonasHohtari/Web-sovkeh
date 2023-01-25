const express = require("express");
const cities = require("./routes/cities");
require("dotenv").config();
const PORT = process.env.API_PORT || 3000;
const app = express(); // returns an express application

app.use(express.json());

const loggingMiddleware = (req, res, next) => {
  console.log(`URL: ${req.url}`);
  next();
};

app.use(loggingMiddleware);

app.get("/", (req, res) => {
  res.status(200).send("Hello backend world!");
});

app.get("/api", (req, res) => {
  res.send("The Cities API");
});

app.use("/api/cities", cities);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
