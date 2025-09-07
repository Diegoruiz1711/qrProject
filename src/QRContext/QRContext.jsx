// QRContext/QRContext.js (actualizado)
import React, { createContext, useContext, useState, useEffect } from 'react';

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

  // Cargar traducciones
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    const detectLanguage = async () => {
      try {
        const savedLanguage = localStorage.getItem('preferredLanguage');
        
        if (savedLanguage) {
          await loadTranslations(savedLanguage);
          setCurrentLanguage(savedLanguage);
          setIsLoading(false);
          return;
        }
        
        const navLang = navigator.language || navigator.userLanguage;
        const primaryLanguage = navLang.split('-')[0];
        
        const supportedLanguage = languages.find(lang => lang.code === primaryLanguage);
        
        if (supportedLanguage) {
          await loadTranslations(primaryLanguage);
          setCurrentLanguage(primaryLanguage);
          localStorage.setItem('preferredLanguage', primaryLanguage);
        } else {
          await loadTranslations('es'); // Idioma por defecto
        }
      } catch (error) {
        console.error("Error detectando idioma:", error);
        await loadTranslations('es'); // Fallback a español
      } finally {
        setIsLoading(false);
      }
    };

    detectLanguage();
  }, []);

  // Función para cargar traducciones
  const loadTranslations = async (langCode) => {
    try {
      const response = await import(`../locales/${langCode}.json`);
      setTranslations(response.default);
    } catch (error) {
      console.error(`Error cargando traducciones para ${langCode}:`, error);
      // Cargar español como fallback
      const fallback = await import(`../locales/es.json`);
      setTranslations(fallback.default);
    }
  };

  // Función para cambiar idioma
  const changeLanguage = async (langCode) => {
    await loadTranslations(langCode);
    setCurrentLanguage(langCode);
    localStorage.setItem('preferredLanguage', langCode);
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
    return translations[key] || key;
  };

  const value = {
    currentLanguage,
    changeLanguage,
    isLoading,
    languages,
    isDropdownOpen,
    toggleDropdown,
    getCurrentLanguageDisplay,
    t // Función de traducción
  };

  return (
    <QRContext.Provider value={value}>
      {children}
    </QRContext.Provider>
  );
};