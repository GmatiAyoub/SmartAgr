function VanRow({ van, onToggleStatus, onEdit, onDelete }) {
    const getStatusBadge = (statut) => {
    if (statut === "Ouvert") {
        return (
        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
            🟢 Ouvert
        </span>
        );
    }
    return (
        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
        🔴 Fermé
        </span>
    );
    };

  // Couleur de zone
    const getZoneBadge = (zone) => {
    const colors = {
        Nord: "bg-blue-100 text-blue-800",
        Sud: "bg-yellow-100 text-yellow-800",
        Est: "bg-purple-100 text-purple-800",
        Ouest: "bg-orange-100 text-orange-800",
        Centre: "bg-pink-100 text-pink-800",
    };
    const colorClass = colors[zone] || "bg-gray-100 text-gray-800";
    return (
        <span
        className={`px-2 py-1 text-xs font-semibold rounded-full ${colorClass}`}
        >
        📍 {zone}
        </span>
    );
    };

    return (
    <tr className="hover:bg-gray-50 transition duration-150">
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        #{van.id}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{van.nom}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">{getZoneBadge(van.zone)}</td>
        <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{van.places} places</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
        <button
            onClick={() => onToggleStatus(van.id, van.statut)}
            className="focus:outline-none transition-transform hover:scale-105"
        >
            {getStatusBadge(van.statut)}
        </button>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div className="flex gap-3">
            <button
            onClick={() => onEdit(van)}
            className="text-blue-600 hover:text-blue-900 transition duration-150"
            >
            ✏️ Modifier
            </button>
            <button
            onClick={() => onDelete(van)}
            className="text-red-600 hover:text-red-900 transition duration-150"
            >
            🗑️ Supprimer
            </button>
        </div>
        </td>
    </tr>
    );
}   

export default VanRow;
