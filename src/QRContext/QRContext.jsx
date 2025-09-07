import React, { createContext, useContext, useState, useEffect } from 'react';

// Importaciones estáticas de todos los archivos JSON
import es from '../Locales/es.json';
import fr from '../Locales/fr.json';
import de from '../Locales/de.json';
import bg from '../Locales/bg.json';
import da from '../Locales/da.json';
import et from '../Locales/et.json';
import el from '../Locales/el.json';
import en from '../Locales/en.json';
import fi from '../Locales/fi.json';
import ga from '../Locales/ga.json';
import hr from '../Locales/hr.json';
import hu from '../Locales/hu.json';
import it from '../Locales/it.json';
import lv from '../Locales/lv.json';
import lt from '../Locales/lt.json';
import mt from '../Locales/mt.json';
import nl from '../Locales/nl.json';
import pl from '../Locales/pl.json';
import pt from '../Locales/pt.json';
import ro from '../Locales/ro.json';
import sk from '../Locales/sk.json';
import sl from '../Locales/sl.json';
import sv from '../Locales/sv.json';
import cs from '../Locales/cs.json';
import ca from '../Locales/ca.json';

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

  // Mapeo de todas las traducciones
  const translationsMap = {
    es, fr, de, bg, da, et, el, en, fi, ga,
    hr, hu, it, lv, lt, mt, nl, pl, pt, ro,
    sk, sl, sv, cs, ca
  };

  const languages = [
    { code: "bg", name: "BG", fullName: "Български" },
    { code: "es", name: "ES", fullName: "Español" },
    { code: "fr", name: "FR", fullName: "Français" },
    { code: "da", name: "DA", fullName: "Dansk" },
    { code: "de", name: "DE", fullName: "Deutsch" },
    { code: "et", name: "ET", fullName: "Eesti" },
    { code: "el", name: "EL", fullName: "Ελληνικά" },
    { code: "en", name: "EN", fullName: "English" },
    { code: "fi", name: "FI", fullName: "Suomi" },
    { code: "ga", name: "GA", fullName: "Gaeilge" },
    { code: "hr", name: "HR", fullName: "Hrvatski" },
    { code: "hu", name: "HU", fullName: "Magyar" },
    { code: "it", name: "IT", fullName: "Italiano" },
    { code: "lv", name: "LV", fullName: "Latviešu" },
    { code: "lt", name: "LT", fullName: "Lietuvių" },
    { code: "mt", name: "MT", fullName: "Malti" },
    { code: "nl", name: "NL", fullName: "Nederlands" },
    { code: "pl", name: "PL", fullName: "Polski" },
    { code: "pt", name: "PT", fullName: "Português" },
    { code: "ro", name: "RO", fullName: "Română" },
    { code: "sk", name: "SK", fullName: "Slovenčina" },
    { code: "sl", name: "SL", fullName: "Slovenščina" },
    { code: "sv", name: "SV", fullName: "Svenska" },
    { code: "cs", name: "CS", fullName: "Čeština" },
    { code: "ca", name: "CA", fullName: "Català" },
  ];

  useEffect(() => {
    const detectLanguage = () => {
      try {
        // Primero verificar si hay un idioma guardado
        const savedLanguage = localStorage.getItem('preferredLanguage');
        
        if (savedLanguage && translationsMap[savedLanguage]) {
          setCurrentTranslations(translationsMap[savedLanguage]);
          setCurrentLanguage(savedLanguage);
          setIsLoading(false);
          return;
        }
        
        // Detectar idioma del navegador
        const navLang = navigator.language || navigator.userLanguage;
        const primaryLanguage = navLang.split('-')[0];
        
        // Verificar si el idioma detectado está soportado
        if (translationsMap[primaryLanguage]) {
          setCurrentTranslations(translationsMap[primaryLanguage]);
          setCurrentLanguage(primaryLanguage);
          localStorage.setItem('preferredLanguage', primaryLanguage);
        } else {
          // Fallback al español
          setCurrentTranslations(es);
          setCurrentLanguage('es');
          localStorage.setItem('preferredLanguage', 'es');
        }
      } catch (error) {
        console.error("Error detectando idioma:", error);
        // Fallback al español en caso de error
        setCurrentTranslations(es);
        setCurrentLanguage('es');
        localStorage.setItem('preferredLanguage', 'es');
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
      // Fallback al español si el idioma no está soportado
      setCurrentTranslations(es);
      setCurrentLanguage('es');
      localStorage.setItem('preferredLanguage', 'es');
    }
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const getCurrentLanguageDisplay = () => {
    const lang = languages.find(l => l.code === currentLanguage);
    return lang ? lang.fullName : "Español";
  };

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