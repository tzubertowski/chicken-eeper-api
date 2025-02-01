// models/config.js
const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Config = sequelize.define('Config', {
  openingHours: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  closingHours: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expectedChickenCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Config;
