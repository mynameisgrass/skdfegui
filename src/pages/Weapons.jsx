import React from 'react';
import { useData } from '../context/DataContext';

const Weapons = ({ searchQuery }) => {
  const { weapons, translate } = useData();

  const filtered = weapons.filter(weapon => {
    const name = translate(`weapon_name_${weapon}`) || weapon;
    return name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem' }}>Weapons</h2>
      <div className="grid-container">
        {filtered.map(weapon => (
          <div className="card" key={weapon}>
            <div className="card-icon" style={{ background: 'rgba(244, 67, 54, 0.1)', color: '#f44336' }}>🔫</div>
            <div className="card-title">{translate(`weapon_name_${weapon}`) || weapon}</div>
            <div className="card-subtitle">ID: {weapon}</div>
          </div>
        ))}
        {filtered.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No weapons found.</p>}
      </div>
    </div>
  );
};

export default Weapons;
