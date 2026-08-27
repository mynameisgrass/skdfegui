import React, { createContext, useContext, useState, useEffect } from 'react';
import Papa from 'papaparse';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({
    translations: {},
    characters: [],
    pets: [],
    weapons: [],
    enemies: [],
    languages: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentLang, setCurrentLang] = useState('English');

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Fetch I2language.csv
        const langRes = await fetch('/data/I2language.csv');
        const langText = await langRes.text();
        
        let parsedLangs = [];
        const translationsMap = {};
        
        Papa.parse(langText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            if (results.meta && results.meta.fields) {
              parsedLangs = results.meta.fields.filter(f => f !== 'id' && f !== '');
            }
            results.data.forEach(row => {
              if (row.id) {
                translationsMap[row.id] = row;
              }
            });
          }
        });

        // Fetch JSON files
        const fetchJson = async (file) => {
          const res = await fetch(`/data/${file}`);
          return res.json();
        };

        const [charData, petData, weaponData, enemyData] = await Promise.all([
          fetchJson('char_code_name.json').catch(() => []),
          fetchJson('pet_code_name.json').catch(() => []),
          fetchJson('weapon_full.json').catch(() => []),
          fetchJson('enemy.json').catch(() => [])
        ]);

        setData({
          translations: translationsMap,
          characters: charData,
          pets: petData,
          weapons: Object.keys(weaponData),
          enemies: enemyData,
          languages: parsedLangs
        });
        
      } catch (err) {
        console.error(err);
        setError('No wiki data available - 404');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const translate = (key) => {
    if (!key) return '';
    const record = data.translations[key] || data.translations[`char_name_${key}`] || data.translations[`pet_name_${key}`] || data.translations[`weapon_name_${key}`];
    if (record && record[currentLang]) {
      return record[currentLang];
    }
    return key;
  };

  return (
    <DataContext.Provider value={{ ...data, loading, error, currentLang, setCurrentLang, translate }}>
      {children}
    </DataContext.Provider>
  );
};
