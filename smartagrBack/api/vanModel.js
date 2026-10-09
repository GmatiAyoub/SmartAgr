const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Van = sequelize.define('Van', {
    id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    },
    nom: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
    notEmpty: {
        msg: 'Le nom est requis',
    },
    },
},
    zone: {
    type: DataTypes.ENUM('Nord', 'Sud', 'Est', 'Ouest', 'Centre'),
    allowNull: false,
    defaultValue: 'Nord',
    },
places: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
    min: {
        args: [1],
        msg: 'Le nombre de places doit être au moins 1',
    },
    max: {
        args: [20],
        msg: 'Le nombre de places ne peut pas dépasser 20',
    },
    },
},
statut: {
    type: DataTypes.ENUM('Ouvert', 'Fermé'),
    defaultValue: 'Ouvert',
},
}, {
tableName: 'vans',
  timestamps: true, // Ajoute createdAt et updatedAt
underscored: false,
});

module.exports = Van;