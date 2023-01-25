const express = require("express");
const router = express.Router();

const CITIES = [
  {
    id: 1,
    capital: "Helsinki",
    country: "Finland",
  },
  {
    id: 2,
    capital: "Paris",
    country: "France",
  },
  {
    id: 3,
    capital: "Berlin",
    country: "Germany",
  },
];

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const city = CITIES.find((city) => city.id === Number(id));
  if (!city) {
    return res.status(404).send(`No city with id ${id} found`);
  } else {
    res.send(city);
  }
});

router.get("/", (req, res) => {
  res.send(CITIES);
});

router.post("/", (req, res) => {
  console.log(req.body);
  const city = {
    id: CITIES.length + 1,
    capital: req.body.capital,
    country: req.body.country,
  };
  CITIES.push(city);
  res.send("City added");
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const city = CITIES.find((city) => city.id === Number(id));
  if (!city) {
    return res.status(404).send(`No city with id ${id} found`);
  } else {
    const index = CITIES.indexOf(city);
    CITIES.splice(index, 1);
    res.send("City deleted");
  }
});

module.exports = router;
