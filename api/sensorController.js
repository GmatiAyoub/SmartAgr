// backend/api/sensorController.js
const Sensor = require('./sensorModel');

// GET /api/sensors - Dernière mesure (pour le Dashboard)
exports.getLatestSensor = async (req, res) => {
  try {
    const latest = await Sensor.findOne({
      order: [['createdAt', 'DESC']],
    });

    if (!latest) {
      return res.json({ temperature: null, humidite: null });
    }

    res.json({
      temperature: latest.temperature,
      humidite: latest.humidite,
      zone: latest.zone,
      timestamp: latest.createdAt,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération des données' });
  }
};

// GET /api/sensors/history - Historique
exports.getSensorHistory = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const history = await Sensor.findAll({
      order: [['createdAt', 'DESC']],
      limit,
    });
    res.json(history);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération de l\'historique' });
  }
};

// GET /api/sensors/:id - Une mesure précise
exports.getSensorById = async (req, res) => {
  try {
    const sensor = await Sensor.findByPk(req.params.id);
    if (!sensor) {
      return res.status(404).json({ error: 'Mesure non trouvée' });
    }
    res.json(sensor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération' });
  }
};

// POST /api/sensors - Enregistrer une nouvelle mesure
exports.createSensor = async (req, res) => {
  try {
    const { temperature, humidite, zone } = req.body;

    if (temperature === undefined || humidite === undefined) {
      return res.status(400).json({
        error: 'Les champs "temperature" et "humidite" sont requis',
      });
    }

    const newSensor = await Sensor.create({
      temperature: parseFloat(temperature),
      humidite: parseFloat(humidite),
      zone: zone || 'Centre',
    });

    res.status(201).json(newSensor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de l\'enregistrement' });
  }
};

// DELETE /api/sensors/:id - Supprimer une mesure
exports.deleteSensor = async (req, res) => {
  try {
    const sensor = await Sensor.findByPk(req.params.id);
    if (!sensor) {
      return res.status(404).json({ error: 'Mesure non trouvée' });
    }
    await sensor.destroy();
    res.json({ message: 'Mesure supprimée avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la suppression' });
  }
};