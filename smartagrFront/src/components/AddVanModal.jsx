import React, { useState } from 'react';

function AddVanModal({ isOpen, onClose, onAdd }) {
  const [formData, setFormData] = useState({
    nom: '',
    zone: 'Nord',
    places: '',
    statut: 'Ouvert'
  });

  const zones = ['Nord', 'Sud', 'Est', 'Ouest', 'Centre'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nom.trim()) {
      alert('Le nom du van est requis');
      return;
    }
    if (!formData.places || formData.places < 1) {
      alert('Le nombre de places doit être au moins 1');
      return;
    }
    
    onAdd({
      nom: formData.nom.trim(),
      zone: formData.zone,
      places: parseInt(formData.places),
      statut: formData.statut
    });
    
    setFormData({ nom: '', zone: 'Nord', places: '', statut: 'Ouvert' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">➕ Ajouter un van</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">×</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="px-6 py-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom du van *</label>
              <input
                type="text"
                value={formData.nom}
                onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Ex: Van Alpha, Renault Master..."
                required
              />
            </div>
        
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Zone d'activité *</label>
              <select
                value={formData.zone}
                onChange={(e) => setFormData({ ...formData, zone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {zones.map(zone => (
                  <option key={zone} value={zone}>{zone}</option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">Ex: Nord, Sud, Est, Ouest, Centre</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de places *</label>
              <input
                type="number"
                value={formData.places}
                onChange={(e) => setFormData({ ...formData, places: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Ex: 5, 8, 12..."
                min="1"
                required
              />
            </div>
            
            {/* Statut */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Statut initial</label>
              <select
                value={formData.statut}
                onChange={(e) => setFormData({ ...formData, statut: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="Ouvert">🟢 Ouvert (disponible)</option>
                <option value="Fermé">🔴 Fermé (indisponible)</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end gap-3 px-6 py-4 bg-gray-50 rounded-b-lg">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition">
              Annuler
            </button>
            <button type="submit" className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 transition">
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddVanModal;