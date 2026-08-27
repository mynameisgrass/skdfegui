import React from 'react';
import { DataProvider } from './context/DataContext';
import AppContent from './AppContent';
import './App.css';

function App() {
  return (
    <DataProvider>
      <AppContent />
    </DataProvider>
  );
}

export default App;
