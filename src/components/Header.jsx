import React from 'react';
import { useData } from '../context/DataContext';
import { RefreshCw, Search } from 'lucide-react';

const Header = ({ activeTab, setActiveTab, searchQuery, setSearchQuery }) => {
  const { languages, currentLang, setCurrentLang } = useData();

  const tabs = [
    { id: 'home', label: 'Home' },
    { id: 'characters', label: 'Characters' },
    { id: 'pets', label: 'Pets' },
    { id: 'weapons', label: 'Weapons' },
    { id: 'materials', label: 'Materials' },
    { id: 'blueprints', label: 'Blueprints' },
    { id: 'enemies', label: 'Enemies' }
  ];

  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">SKDFE Wiki</div>
        <nav className="nav-links">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`nav-link ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      
      <div className="header-right">
        <div style={{ position: 'relative' }}>
          <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            className="search-input" 
            placeholder="Search wiki" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ paddingLeft: '32px' }}
          />
        </div>
        
        <select 
          className="lang-select" 
          value={currentLang} 
          onChange={(e) => setCurrentLang(e.target.value)}
        >
          {languages.map(lang => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </select>
        
        <button className="refresh-btn" onClick={() => window.location.reload()}>
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>
    </header>
  );
};

export default Header;
