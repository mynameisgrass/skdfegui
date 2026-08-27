import React, { useState } from 'react';
import Header from './components/Header';
import { useData } from './context/DataContext';

import Home from './pages/Home';
import Characters from './pages/Characters';
import Pets from './pages/Pets';
import Weapons from './pages/Weapons';
import Materials from './pages/Materials';
import Blueprints from './pages/Blueprints';
import Enemies from './pages/Enemies';

function AppContent() {
  const { loading, error } = useData();
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');

  if (loading) {
    return (
      <div className="app-container">
        <Header activeTab={activeTab} setActiveTab={setActiveTab} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <main className="main-content">
          <p className="loading-text">Loading wiki...</p>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-container">
        <Header activeTab={activeTab} setActiveTab={setActiveTab} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <main className="main-content">
          <p className="loading-text">Loading wiki...</p>
          <div className="error-banner">
            <span>{error}</span>
          </div>
          <a href="https://github.com/aznoobnam/skdfe" className="source-link" target="_blank" rel="noreferrer">
            Source: aznoobnam/skdfe
          </a>
        </main>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <main className="main-content">
        {activeTab === 'home' && <Home />}
        {activeTab === 'characters' && <Characters searchQuery={searchQuery} />}
        {activeTab === 'pets' && <Pets searchQuery={searchQuery} />}
        {activeTab === 'weapons' && <Weapons searchQuery={searchQuery} />}
        {activeTab === 'materials' && <Materials searchQuery={searchQuery} />}
        {activeTab === 'blueprints' && <Blueprints searchQuery={searchQuery} />}
        {activeTab === 'enemies' && <Enemies searchQuery={searchQuery} />}
      </main>
    </div>
  );
}

export default AppContent;
