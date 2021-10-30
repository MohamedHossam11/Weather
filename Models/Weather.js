const Sequelize = require('sequelize');

const sequelize = require('../constants');

const { Model } = Sequelize;

class Weather extends Model {}
Weather.init(
  {
    date: {
      type: Sequelize.DATEONLY,
    },
    lat: {
      type: Sequelize.FLOAT,
    },
    lon: {
      type: Sequelize.FLOAT,
    },
    city: {
      type: Sequelize.STRING,
    },
    state: {
      type: Sequelize.STRING,
    },
    temperatures: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.FLOAT),
  },
  {
    sequelize,
    timestamps: false,
  }
);

module.exports = Weather;
