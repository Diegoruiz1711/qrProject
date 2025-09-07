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