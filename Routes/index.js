const express = require('express');
const router = express.Router();
const {
  postWeather,
  getWeather,
  getWeatherById,
} = require('../Controller/index');

router.post('/', postWeather);
router.get('/', getWeather);
router.get('/:id', getWeatherById);

module.exports = router;
