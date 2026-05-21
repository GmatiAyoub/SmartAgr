import { useState } from 'react';
import VanRow from './VanRow';
import EditVanModal from './EditVanModal';
import DeleteConfirmModal from './DeleteConfirmModal';
// props : vans[] tableau des vans a afficher
// onToggleStatus: fonction pour basculer le statut
// onUpdateVan: fonction pour mettre a jour un van
// onDeleteVan : fonction pour supprimer un van
function VanTable({ vans, onToggleStatus, onUpdateVan, onDeleteVan }) {
    const [editingVan, setEditingVan] = useState(null);
    const [deletingVan, setDeletingVan] = useState(null);

    if (vans.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <p className="text-gray-500 text-lg">Aucun van pour le moment</p>
                <p className="text-gray-400 mt-2">Cliquez sur "Ajouter un van" pour commencer</p>
            </div>
        );
    }

    return (
        <>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Zone</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Places</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {vans.map((van) => (
                                <VanRow
                                    key={van.id}
                                    van={van}
                                    onToggleStatus={onToggleStatus}
                                    onEdit={setEditingVan}
                                    onDelete={setDeletingVan}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {editingVan && (
                <EditVanModal
                    van={editingVan}
                    onClose={() => setEditingVan(null)}
                    onSave={onUpdateVan}
                />
            )}

            {deletingVan && (
                <DeleteConfirmModal
                    van={deletingVan}
                    onClose={() => setDeletingVan(null)}
                    onConfirm={onDeleteVan}
                />
            )}
        </>
    );
}

export default VanTable;