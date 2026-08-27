import React from 'react';
import { useData } from '../context/DataContext';

const Characters = ({ searchQuery }) => {
  const { characters, translate } = useData();

  const filtered = characters.filter(char => {
    const name = translate(`char_name_${char}`) || char;
    return name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem' }}>Characters</h2>
      <div className="grid-container">
        {filtered.map(char => (
          <div className="card" key={char}>
            <div className="card-icon" style={{ background: 'rgba(76, 175, 80, 0.1)', color: '#4caf50' }}>👤</div>
            <div className="card-title">{translate(`char_name_${char}`) || char}</div>
            <div className="card-subtitle">ID: {char}</div>
          </div>
        ))}
        {filtered.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No characters found.</p>}
      </div>
    </div>
  );
};

export default Characters;
