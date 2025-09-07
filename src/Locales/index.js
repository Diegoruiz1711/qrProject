// src/locales/index.js
// Este archivo centraliza la exportación de todas las traducciones

// Importar todos los archivos de traducción con extensión completa
import es from './es.json';
import fr from './fr.json';
import de from './de.json';
import bg from './bg.json';
import da from './da.json';
import et from './et.json';
import el from './el.json';
import en from './en.json';
import fi from './fi.json';
import ga from './ga.json';
import hr from './hr.json';
import hu from './hu.json';
import it from './it.json';
import lv from './lv.json';
import lt from './lt.json';
import mt from './mt.json';
import nl from './nl.json';
import pl from './pl.json';
import pt from './pt.json';
import ro from './ro.json';
import sk from './sk.json';
import sl from './sl.json';
import sv from './sv.json';
import cs from './cs.json';
import ca from './ca.json';

// Exportar todas las traducciones como un objeto
const translations = {
  es, fr, de, bg, da, et, el, en, fi, ga,
  hr, hu, it, lv, lt, mt, nl, pl, pt, ro,
  sk, sl, sv, cs, ca
};

export default translations;

// También exportar individualmente por si se necesitan
export {
  es, fr, de, bg, da, et, el, en, fi, ga,
  hr, hu, it, lv, lt, mt, nl, pl, pt, ro,
  sk, sl, sv, cs, ca
};

// Exportar la lista de idiomas soportados
export const supportedLanguages = [
  'es', 'fr', 'de', 'bg', 'da', 'et', 'el', 'en', 'fi', 'ga',
  'hr', 'hu', 'it', 'lv', 'lt', 'mt', 'nl', 'pl', 'pt', 'ro',
  'sk', 'sl', 'sv', 'cs', 'ca'
];