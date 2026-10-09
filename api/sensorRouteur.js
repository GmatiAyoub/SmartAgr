// backend/api/sensorRouteur.js
const express = require('express');
const router = express.Router();
const sensorController = require('./sensorController');

// Routes
router.get('/', sensorController.getLatestSensor);        // Dernière mesure
router.get('/history', sensorController.getSensorHistory); // Historique
router.get('/:id', sensorController.getSensorById);       // Une mesure
router.post('/', sensorController.createSensor);          // Créer
router.delete('/:id', sensorController.deleteSensor);     // Supprimer

module.exports = router;