const Joi = require('joi');
const cities = require('../models/cities');

const getCities = async (req, res) => {
  try {
    const response = await cities.findAll();
    if(response) {
      res.send(response);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

const getCityById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const response = await cities.findCityById(id);
    if(response.length === 1) {
      res.send(response[0]);
    }
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
};

const createCity = async (req, res) => {
  const schema = Joi.object({
    capital: Joi.string().min(4).required(),
    country: Joi.string().min(4).required(),
    image: Joi.string()
  });

  const { error } = schema.validate(req.body);
  if(error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const city = {
    capital: req.body.capital,
    country: req.body.country,
    image: req.body.image
  }

  try {
    const result = await cities.findByCity(city);
    if(result.length > 0) {
      res.status(400).send('City is in the database already');
      return;
    }
    const response = await cities.create(city);
    if(response) {
      city.id = response.insertId;
      res.status(201).send(city);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

const deleteCity = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const response = await cities.deleteById(id);
    if(response) {
      res.status(200).send('City deleted');
    }
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
};

module.exports = {
  createCity,
  getCityById,
  deleteCity,
  getCities
};