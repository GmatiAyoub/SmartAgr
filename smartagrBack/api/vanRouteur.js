const express = require('express');
const router = express.Router();
const vanController = require('../api/vanController');

// Routes CRUD
router.get('/vans', vanController.getAllVans);
router.get('/vans/:id', vanController.getVanById);
router.post('/vans', vanController.createVan);
router.put('/vans/:id', vanController.updateVan);
router.patch('/vans/:id/status', vanController.updateStatus);
router.delete('/vans/:id', vanController.deleteVan);

module.exports = router;