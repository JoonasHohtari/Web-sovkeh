const express = require('express');
const router = express.Router();

const verifyToken = require('../middleware/verifyToken');

const { createCity, deleteCity, getCities, getCityById } = require('../controllers/cities');

router.get('/', getCities);
router.get('/:id', getCityById);

//router.use(verifyToken);

router.post('/', createCity);
router.delete('/:id', deleteCity);


module.exports = router;
