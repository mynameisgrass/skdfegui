import React from 'react';
import { useData } from '../context/DataContext';

const Home = () => {
  const { characters, pets, weapons, enemies, error } = useData();

  return (
    <div className="home-page">
      <h2>Welcome to SKDFE Wiki</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
        A comprehensive database for Soul Knight Data For Everyone.
      </p>

      {error ? (
        <>
          <p className="loading-text">Loading wiki...</p>
          <div className="error-banner">
            <span>{error}</span>
          </div>
          <a href="https://github.com/aznoobnam/skdfe" className="source-link" target="_blank" rel="noreferrer">
            Source: aznoobnam/skdfe
          </a>
        </>
      ) : (
        <div className="grid-container">
          <div className="card">
            <div className="card-icon">⚔️</div>
            <div className="card-title">Characters</div>
            <div className="card-subtitle">{characters.length} characters</div>
          </div>
          <div className="card">
            <div className="card-icon">🐾</div>
            <div className="card-title">Pets</div>
            <div className="card-subtitle">{pets.length} pets</div>
          </div>
          <div className="card">
            <div className="card-icon">🔫</div>
            <div className="card-title">Weapons</div>
            <div className="card-subtitle">{weapons.length} weapons</div>
          </div>
          <div className="card">
            <div className="card-icon">👾</div>
            <div className="card-title">Enemies</div>
            <div className="card-subtitle">{enemies.length} enemies</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
