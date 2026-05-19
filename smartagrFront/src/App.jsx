import { useState, useEffect } from 'react';
import axios from 'axios';
import VanTable from './components/VanTable';
import AddVanModal from './components/AddVanModal';

function App() {
  const [vans, setVans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/api/vans")
      .then((response) => {
        console.log(response);
        setVans(response.data);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setVans([]);
        setError("Impossible de charger les vans");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []); //tableau vide car s execute une seule fois au montage

  const handleAddVan = (vanData) => {
    axios
      .post("http://localhost:5000/api/vans", vanData)
      .then((response) => {
        setVans([...vans, response.data]);
        setIsAddModalOpen(false);
      })
      .catch((err) => {
        console.error(err);
        alert("Erreur lors de l'ajout");
      });
  };

  const handleUpdateVan = (id, updatedData) => {
    axios
      .put(`http://localhost:5000/api/vans/${id}`, updatedData)
      .then((response) => {
        setVans(vans.map(van => van.id === id ? response.data : van));
      })
      .catch((err) => {
        console.error(err);
        alert("Erreur lors de la modification");
      });
  };

  const handleToggleStatus = (id, currentStatus) => {
    const newStatus = currentStatus === 'Ouvert' ? 'Fermé' : 'Ouvert';
    axios
      .patch(`http://localhost:5000/api/vans/${id}/status`, { statut: newStatus })
      .then((response) => {
        setVans(vans.map(van => van.id === id ? response.data : van));
      })
      .catch((err) => {
        console.error(err);
        alert("Erreur lors du changement de statut");
      });
  };

  const handleDeleteVan = (id) => {
    axios
      .delete(`http://localhost:5000/api/vans/${id}`)
      .then(() => {
        setVans(vans.filter(van => van.id !== id));
      })
      .catch((err) => {
        console.error(err);
        alert("Erreur lors de la suppression");
      });
  };


  const handleRefresh = () => {
    setLoading(true);
    axios
      .get("http://localhost:5000/api/vans")
      .then((response) => {
        setVans(response.data);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError("Impossible de charger les vans");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-green-800 mb-2">
            🚐 Gestion des Vans Agricoles
          </h1>
          <p className="text-gray-600">Gérez votre flotte de vans par zone</p>
        </div>


        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-200 flex items-center gap-2"
          >
            <span className="text-xl">➕</span>
            Ajouter un van
          </button>

          <button
            onClick={handleRefresh}
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-200 flex items-center gap-2"
          >
            <span className="text-xl">🔄</span>
            Actualiser
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {loading ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mb-4"></div>
              <p className="text-gray-500 text-lg">Chargement des vans...</p>
            </div>
          </div>
        ) : (
          <VanTable
            vans={vans}
            onToggleStatus={handleToggleStatus}
            onUpdateVan={handleUpdateVan}
            onDeleteVan={handleDeleteVan}
          />
        )}


        <AddVanModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddVan}
        />
      </div>
    </div>
  );
}

export default App;