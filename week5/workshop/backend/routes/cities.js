const express = require("express");
const router = express.Router();

const {
  createCity,
  deleteCity,
  getCities,
  getCityById,
} = require("../controllers/cities");

router.get("/", getCities);
router.get("/:id", getCityById);
router.post("/", createCity);
router.delete("/:id", deleteCity);

module.exports = router;
