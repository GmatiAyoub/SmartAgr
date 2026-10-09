// backend/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/database');

const vanRoutes = require('./api/vanRouteur');
const sensorRoutes = require('./api/sensorRouteur'); // 🆕 CHEMIN CORRIGÉ

const Van = require('./api/vanModel');
const Sensor = require('./api/sensorModel'); // 🆕 Import pour sync()

// Configuration
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', vanRoutes);              // -> /api/vans
app.use('/api/sensors', sensorRoutes);   // -> /api/sensors

// Route de test
app.get('/', (req, res) => {
  res.json({
    message: 'API Gestion des Vans + Capteurs - Bienvenue !',
    version: '1.1.0',
    endpoints: {
      // Vans
      getAllVans: 'GET /api/vans',
      getOneVan: 'GET /api/vans/:id',
      createVan: 'POST /api/vans',
      updateVan: 'PUT /api/vans/:id',
      updateStatus: 'PATCH /api/vans/:id/status',
      deleteVan: 'DELETE /api/vans/:id',
      // Sensors 🆕
      getLatestSensor: 'GET /api/sensors',
      getSensorHistory: 'GET /api/sensors/history',
      createSensor: 'POST /api/sensors',
      deleteSensor: 'DELETE /api/sensors/:id',
    },
  });
});

// Synchronisation de la base de données et démarrage
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connexion à MySQL réussie');

    await sequelize.sync({ alter: true });
    console.log('✅ Tables synchronisées avec MySQL');

    app.listen(PORT, () => {
      console.log(`\n🚀 Serveur démarré sur http://localhost:${PORT}`);
      console.log(`📋 API Vans:    http://localhost:${PORT}/api/vans`);
      console.log(`🌡️  API Sensors: http://localhost:${PORT}/api/sensors`);
      console.log(`💾 Base de données: ${process.env.DB_NAME}\n`);
    });
  } catch (error) {
    console.error('❌ Erreur de connexion à MySQL:', error);
  }
};

startServer();