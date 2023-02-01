const express = require('express');
const cities = require('./routes/cities');

const app = express();
app.use(express.json());

app.use('/api/cities', cities);

module.exports = app;