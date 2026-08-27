import React from 'react';
import { useData } from '../context/DataContext';

const Enemies = ({ searchQuery }) => {
  const { enemies, translate } = useData();

  const filtered = enemies.filter(enemy => {
    const name = translate(enemy) || enemy;
    return name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem' }}>Enemies</h2>
      <div className="grid-container">
        {filtered.map(enemy => (
          <div className="card" key={enemy}>
            <div className="card-icon" style={{ background: 'rgba(156, 39, 176, 0.1)', color: '#9c27b0' }}>👾</div>
            <div className="card-title">{translate(enemy) || enemy}</div>
            <div className="card-subtitle">ID: {enemy}</div>
          </div>
        ))}
        {filtered.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No enemies found.</p>}
      </div>
    </div>
  );
};

export default Enemies;
