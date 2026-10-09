// backend/api/sensorModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Sensor = sequelize.define('Sensor', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  temperature: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: -50,
      max: 100,
    },
  },
  humidite: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0,
      max: 100,
    },
  },
  zone: {
    type: DataTypes.STRING,
    defaultValue: 'Centre',
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'sensors',
  timestamps: false,
});

module.exports = Sensor;