// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importar todos los idiomas
import translationES from './locales/es.json';
import translationFR from './locales/fr.json';
import translationDE from './locales/de.json';
import translationBG from './locales/bg.json';
import translationDA from './locales/da.json';
import translationET from './locales/et.json';
import translationEL from './locales/el.json';
import translationEN from './locales/en.json';
import translationFI from './locales/fi.json';
import translationGA from './locales/ga.json';
import translationHR from './locales/hr.json';
import translationHU from './locales/hu.json';
import translationIT from './locales/it.json';
import translationLV from './locales/lv.json';
import translationLT from './locales/lt.json';
import translationMT from './locales/mt.json';
import translationNL from './locales/nl.json';
import translationPL from './locales/pl.json';
import translationPT from './locales/pt.json';
import translationRO from './locales/ro.json';
import translationSK from './locales/sk.json';
import translationSL from './locales/sl.json';
import translationSV from './locales/sv.json';
import translationCS from './locales/cs.json';
import translationCA from './locales/ca.json';

// Lista de idiomas soportados
const supportedLanguages = ['es', 'fr', 'de', 'bg', 'da', 'et', 'el', 'en', 'fi', 'ga', 'hr', 'hu', 'it', 'lv', 'lt', 'mt', 'nl', 'pl', 'pt', 'ro', 'sk', 'sl', 'sv', 'cs', 'ca'];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      es: { translation: translationES },
      fr: { translation: translationFR },
      de: { translation: translationDE },
      bg: { translation: translationBG },
      da: { translation: translationDA },
      et: { translation: translationET },
      el: { translation: translationEL },
      en: { translation: translationEN },
      fi: { translation: translationFI },
      ga: { translation: translationGA },
      hr: { translation: translationHR },
      hu: { translation: translationHU },
      it: { translation: translationIT },
      lv: { translation: translationLV },
      lt: { translation: translationLT },
      mt: { translation: translationMT },
      nl: { translation: translationNL },
      pl: { translation: translationPL },
      pt: { translation: translationPT },
      ro: { translation: translationRO },
      sk: { translation: translationSK },
      sl: { translation: translationSL },
      sv: { translation: translationSV },
      cs: { translation: translationCS },
      ca: { translation: translationCA },
    },
    fallbackLng: 'es',
    supportedLngs: supportedLanguages,
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage'],
      checkWhitelist: true
    },
  });

export default i18n;