import React, { useState, useEffect } from 'react';

function App() {
  const [vans, setVans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [error, setError] = useState(null);

  return ( <div className="App">
    <h1>Vans List</h1>
    {loading && <p>Loading vans...</p>}
    {error && <p className="error">{error}</p>}
    {!loading && !error && (
      <ul>
        {vans.map((van) => (
          <li key={van.id}>{van.name}</li>
        ))}
      </ul>
    )}
    <button onClick={() => setIsAddModalOpen(true)}>Add Van</button>
    </div> );
}

export default App;