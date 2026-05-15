const Van = require('../api/vanModel');
const { ValidationError } = require('sequelize');

// Récupérer tous les vans
const getAllVans = async (req, res) => {
    try {
    const vans = await Van.findAll({
        order: [['id', 'ASC']],
    });
    res.status(200).json(vans);
    } catch (error) {
    console.error('❌ Erreur getAllVans:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des vans' });
    }
};

// Récupérer un van par ID
const getVanById = async (req, res) => {
    try {
    const van = await Van.findByPk(req.params.id);
    if (!van) {
        return res.status(404).json({ message: 'Van non trouvé' });
    }
    res.status(200).json(van);
    } catch (error) {
    console.error('❌ Erreur getVanById:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération du van' });
    }
};

// Créer un van
const createVan = async (req, res) => {
    try {
    const { nom, zone, places, statut } = req.body;
    
    // Validation simple
    if (!nom || !places) {
        return res.status(400).json({ message: 'Nom et places sont requis' });
    }

    const newVan = await Van.create({
        nom: nom.trim(),
        zone: zone || 'Nord',
        places: parseInt(places),
        statut: statut || 'Ouvert',
    });

    res.status(201).json(newVan);
    } catch (error) {
    console.error('❌ Erreur createVan:', error);
    
    if (error instanceof ValidationError) {
        return res.status(400).json({ message: error.errors[0].message });
    }
    
    res.status(500).json({ message: 'Erreur lors de la création du van' });
    }
};

// Modifier un van (nom, zone, places)
const updateVan = async (req, res) => {
    try {
    const van = await Van.findByPk(req.params.id);
    if (!van) {
        return res.status(404).json({ message: 'Van non trouvé' });
    }

    const { nom, zone, places } = req.body;
    
    await van.update({
        nom: nom !== undefined ? nom.trim() : van.nom,
        zone: zone || van.zone,
        places: places !== undefined ? parseInt(places) : van.places,
    });

    res.status(200).json(van);
    } catch (error) {
    console.error('❌ Erreur updateVan:', error);
    
    if (error instanceof ValidationError) {
        return res.status(400).json({ message: error.errors[0].message });
    }
    
    res.status(500).json({ message: 'Erreur lors de la modification du van' });
    }
};

// Modifier seulement le statut
const updateStatus = async (req, res) => {
    try {
    const van = await Van.findByPk(req.params.id);
    if (!van) {
        return res.status(404).json({ message: 'Van non trouvé' });
    }

    const { statut } = req.body;
    
    if (!statut || (statut !== 'Ouvert' && statut !== 'Fermé')) {
        return res.status(400).json({ message: 'Statut invalide. Utilisez "Ouvert" ou "Fermé"' });
    }

    await van.update({ statut });
    res.status(200).json(van);
    } catch (error) {
    console.error('❌ Erreur updateStatus:', error);
    res.status(500).json({ message: 'Erreur lors du changement de statut' });
    }
};

// Supprimer un van
const deleteVan = async (req, res) => {
    try {
    const van = await Van.findByPk(req.params.id);
    if (!van) {
        return res.status(404).json({ message: 'Van non trouvé' });
    }

    await van.destroy();
    res.status(200).json({ message: 'Van supprimé avec succès' });
    } catch (error) {
    console.error('❌ Erreur deleteVan:', error);
    res.status(500).json({ message: 'Erreur lors de la suppression du van' });
    }
};  

module.exports = {
    getAllVans,
    getVanById,
    createVan,
    updateVan,
    updateStatus,
    deleteVan,
};