
// props : van objet contenant les infos du van a supprimer 
// onClose : fonction pour fermer la modal
// onConfirm : fonction pour confirmer la suppression
function DeleteConfirmModal({ van, onClose, onConfirm }) {
    const handleConfirm = () => {
        onConfirm(van.id);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
                <div className="px-6 py-4 border-b">
                    <h2 className="text-xl font-semibold text-gray-800">🗑️ Confirmer la suppression</h2>
                </div>

                <div className="px-6 py-4">
                    <p className="text-gray-700">
                        Êtes-vous sûr de vouloir supprimer le van <span className="font-semibold">"{van.nom}"</span> ?
                    </p>
                    <p className="text-sm text-red-600 mt-2">Cette action est irréversible.</p>
                </div>

                <div className="flex justify-end gap-3 px-6 py-4 bg-gray-50 rounded-b-lg">
                    <button onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition">
                        Annuler
                    </button>
                    <button onClick={handleConfirm} className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 transition">
                        Supprimer
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteConfirmModal;