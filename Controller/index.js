const WeatherModel = require('../Models/Weather');
const { Op } = require('sequelize');

const postWeather = async (req, res) => {
  try {
    const weatherCreated = await WeatherModel.create(req.body);
    return res.status(201).json(weatherCreated);
  } catch (exception) {
    return res.json({ msg: exception, statusCode: 500 });
  }
};

const getWeather = async (req, res) => {
  try {
    const { query } = req;
    const arrayOfFilters = [{ id: { [Op.ne]: 0 } }];
    let sort = [['id', 'ASC']];

    Object.keys(query).forEach((key) => {
      if (key === 'city') {
        const citySplitted = query[key].split(',');
        const values = [];
        citySplitted.map((element) => {
          values.push({ city: { [Op.iLike]: element } });
        });
        const newJson = { [Op.or]: values };
        arrayOfFilters.push(newJson);
      } else {
        if (key === 'date') {
          const newJson = {};
          newJson[`${key}`] = query[key];
          arrayOfFilters.push(newJson);
        } else {
          if (key === 'sort') {
            if (query[key] === 'date') {
              sort = [['date', 'DESC']];
            } else {
              if (query[key] === '-date') {
                sort = [['date', 'ASC']];
              }
            }
          }
        }
      }
    });
    const weatherFetched = await WeatherModel.findAll({
      where: {
        [Op.or]: arrayOfFilters,
      },
      order: sort,
    });
    return res.status(200).json(weatherFetched);
  } catch (exception) {
    return res.json({ msg: 'error', statusCode: 500 });
  }
};

const getWeatherById = async (req, res) => {
  try {
    const { params } = req;
    if (params.id) {
      const weatherFetched = await WeatherModel.findOne({
        where: { id: params.id },
      });
      if (weatherFetched) return res.status(200).json(weatherFetched);
    }
    console.log('here');
    return res.status(404).json({});
  } catch (exception) {
    return res.json({ msg: 'error', statusCode: 500 });
  }
};

module.exports = { postWeather, getWeather, getWeatherById };
