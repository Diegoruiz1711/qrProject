// QRContext/QRContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

// Importaciones estáticas de todos los archivos JSON
import es from '../locales/es.json';
import fr from '../locales/fr.json';
import de from '../locales/de.json';
import bg from '../locales/bg.json';
import da from '../locales/da.json';
import et from '../locales/et.json';
import el from '../locales/el.json';
import en from '../locales/en.json';
import fi from '../locales/fi.json';
import ga from '../locales/ga.json';
import hr from '../locales/hr.json';
import hu from '../locales/hu.json';
import it from '../locales/it.json';
import lv from '../locales/lv.json';
import lt from '../locales/lt.json';
import mt from '../locales/mt.json';
import nl from '../locales/nl.json';
import pl from '../locales/pl.json';
import pt from '../locales/pt.json';
import ro from '../locales/ro.json';
import sk from '../locales/sk.json';
import sl from '../locales/sl.json';
import sv from '../locales/sv.json';
import cs from '../locales/cs.json';
import ca from '../locales/ca.json';

const QRContext = createContext();

export const useQR = () => {
  const context = useContext(QRContext);
  if (!context) {
    throw new Error('useQR debe ser usado dentro de un QRProvider');
  }
  return context;
};

export const QRProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('es');
  const [isLoading, setIsLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentTranslations, setCurrentTranslations] = useState(es);

  // Mapeo de importaciones
  const translationsMap = {
    es, fr, de, bg, da, et, el, en, fi, ga,
    hr, hu, it, lv, lt, mt, nl, pl, pt, ro,
    sk, sl, sv, cs, ca
  };

  const languages = [
    { code: "bg", name: "BG", fullName: "Български" },
    { code: "es", name: "ES", fullName: "Español" },
    // ... resto de idiomas
  ];

  useEffect(() => {
    const detectLanguage = () => {
      try {
        const savedLanguage = localStorage.getItem('preferredLanguage');
        
        if (savedLanguage && translationsMap[savedLanguage]) {
          setCurrentTranslations(translationsMap[savedLanguage]);
          setCurrentLanguage(savedLanguage);
          setIsLoading(false);
          return;
        }
        
        const navLang = navigator.language || navigator.userLanguage;
        const primaryLanguage = navLang.split('-')[0];
        
        if (translationsMap[primaryLanguage]) {
          setCurrentTranslations(translationsMap[primaryLanguage]);
          setCurrentLanguage(primaryLanguage);
          localStorage.setItem('preferredLanguage', primaryLanguage);
        } else {
          setCurrentTranslations(es);
          setCurrentLanguage('es');
        }
      } catch (error) {
        console.error("Error detectando idioma:", error);
        setCurrentTranslations(es);
        setCurrentLanguage('es');
      } finally {
        setIsLoading(false);
      }
    };

    detectLanguage();
  }, []);

  const changeLanguage = (langCode) => {
    if (translationsMap[langCode]) {
      setCurrentTranslations(translationsMap[langCode]);
      setCurrentLanguage(langCode);
      localStorage.setItem('preferredLanguage', langCode);
    } else {
      setCurrentTranslations(es);
      setCurrentLanguage('es');
    }
    setIsDropdownOpen(false);
  };

  // ... resto del código igual

  // Función de traducción
  const t = (key) => {
    return currentTranslations[key] || key;
  };

  const value = {
    currentLanguage,
    changeLanguage,
    isLoading,
    languages,
    isDropdownOpen,
    toggleDropdown,
    getCurrentLanguageDisplay,
    t
  };

  return (
    <QRContext.Provider value={value}>
      {children}
    </QRContext.Provider>
  );
};