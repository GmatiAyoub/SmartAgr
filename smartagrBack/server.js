const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const vanRoutes = require('./api/vanRouteur');
const Van = require('./api/vanModel');

// Configuration
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', vanRoutes);

// Route de test
app.get('/', (req, res) => {
  res.json({
    message: 'API Gestion des Vans - Bienvenue !',
    version: '1.0.0',
    endpoints: {
      getAll: 'GET /api/vans',
      getOne: 'GET /api/vans/:id',
      create: 'POST /api/vans',
      update: 'PUT /api/vans/:id',
      updateStatus: 'PATCH /api/vans/:id/status',
      delete: 'DELETE /api/vans/:id'
    }
  });
});

// Synchronisation de la base de données et démarrage
const startServer = async () => {
  try {
    // Tester la connexion à MySQL
    await sequelize.authenticate();
    console.log('✅ Connexion à MySQL réussie');

    // Synchroniser les modèles (créer la table si elle n'existe pas)
    await sequelize.sync({ alter: true });
    console.log('✅ Tables synchronisées avec MySQL');

    // Démarrer le serveur
    app.listen(PORT, () => {
      console.log(`\n🚀 Serveur démarré sur http://localhost:${PORT}`);
      console.log(`📋 API Vans: http://localhost:${PORT}/api/vans`);
      console.log(`💾 Base de données: ${process.env.DB_NAME}\n`);
    });
  } catch (error) {
    console.error('❌ Erreur de connexion à MySQL:', error);
    console.log('\n💡 Vérifiez que:');
    console.log('   1. MySQL est installé et démarré');
    console.log('   2. Les identifiants dans .env sont corrects');
    console.log('   3. La base de données existe');
  }
};

startServer();