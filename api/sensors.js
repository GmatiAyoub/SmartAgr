// backend/routes/sensors.js
const express = require('express');
const router = express.Router();

let sensorData = {
  temperature: 22.5,
  humidite: 65.0,
};

// GET - Récupérer les données des capteurs
router.get('/', (req, res) => {
  // Simulation : variation aléatoire pour tester
  sensorData = {
    temperature: parseFloat((18 + Math.random() * 15).toFixed(1)),
    humidite: parseFloat((40 + Math.random() * 45).toFixed(1)),
  };
  res.json(sensorData);
});

module.exports = router;