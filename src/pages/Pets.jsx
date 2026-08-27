import React from 'react';
import { useData } from '../context/DataContext';

const Pets = ({ searchQuery }) => {
  const { pets, translate } = useData();

  const filtered = pets.filter(pet => {
    const name = translate(`pet_name_${pet}`) || pet;
    return name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem' }}>Pets</h2>
      <div className="grid-container">
        {filtered.map(pet => (
          <div className="card" key={pet}>
            <div className="card-icon" style={{ background: 'rgba(255, 152, 0, 0.1)', color: '#ff9800' }}>🐾</div>
            <div className="card-title">{translate(`pet_name_${pet}`) || pet}</div>
            <div className="card-subtitle">ID: {pet}</div>
          </div>
        ))}
        {filtered.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No pets found.</p>}
      </div>
    </div>
  );
};

export default Pets;
