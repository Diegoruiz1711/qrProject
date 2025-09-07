// scripts/generate-translations-advanced.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { translate } from '@vitalets/google-translate-api';

// Para manejar __dirname en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración
const localesDir = path.join(__dirname, '../src/locales');
const sourceLanguage = 'es';

// Mapeo de códigos de idioma para la API de Google
const languageMap = {
  'bg': 'bg', // búlgaro
  'es': 'es', // español
  'fr': 'fr', // francés
  'da': 'da', // danés
  'de': 'de', // alemán
  'et': 'et', // estonio
  'el': 'el', // griego
  'en': 'en', // inglés
  'fi': 'fi', // finlandés
  'ga': 'ga', // irlandés
  'hr': 'hr', // croata
  'hu': 'hu', // húngaro
  'it': 'it', // italiano
  'lv': 'lv', // letón
  'lt': 'lt', // lituano
  'mt': 'mt', // maltés
  'nl': 'nl', // neerlandés
  'pl': 'pl', // polaco
  'pt': 'pt', // portugués
  'ro': 'ro', // rumano
  'sk': 'sk', // eslovaco
  'sl': 'sl', // esloveno
  'sv': 'sv', // sueco
  'cs': 'cs', // checo
  'ca': 'ca', // catalán
};

// Lista de idiomas a traducir (excluyendo el español)
const targetLanguages = [
  'fr', 'de', 'bg', 'da', 'et', 'el', 'en', 'fi', 'ga',
  'hr', 'hu', 'it', 'lv', 'lt', 'mt', 'nl', 'pl', 'pt', 'ro',
  'sk', 'sl', 'sv', 'cs', 'ca'
];

// Función para traducir texto con retry y delay
async function translateText(text, targetLang, retries = 3) {
  if (!text || typeof text !== 'string') return text;
  
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`   🔄 Traduciendo: "${text.substring(0, 40)}${text.length > 40 ? '...' : ''}"`);
      
      const res = await translate(text, { 
        from: sourceLanguage, 
        to: languageMap[targetLang] || targetLang 
      });
      
      // Pequeño delay para no saturar la API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return res.text;
    } catch (error) {
      console.error(`   ❌ Intento ${attempt} error traduciendo a ${targetLang}:`, error.message);
      
      if (attempt === retries) {
        console.error(`   ⚠️  Fallo la traducción para: ${text}`);
        return text; // Devuelve el texto original si falla
      }
      
      // Espera antes de reintentar
      await new Promise(resolve => setTimeout(resolve, 2000 * attempt));
    }
  }
}

// Función principal
async function generateTranslatedFiles() {
  console.log('🌍 Iniciando traducción automática...\n');
  
  try {
    // Leer el archivo en español completo
    const esFilePath = path.join(localesDir, 'es.json');
    if (!fs.existsSync(esFilePath)) {
      throw new Error('❌ Primero debes crear el archivo es.json con todas las traducciones en español');
    }
    
    const esContent = JSON.parse(fs.readFileSync(esFilePath, 'utf8'));
    console.log(`📖 Leyendo ${Object.keys(esContent).length} textos desde es.json\n`);
    
    // Traducir a cada idioma objetivo
    for (const targetLang of targetLanguages) {
      const targetFilePath = path.join(localesDir, `${targetLang}.json`);
      
      console.log(`\n🔁 Traduciendo a ${targetLang.toUpperCase()}...`);
      
      let targetContent = {};
      let translatedCount = 0;
      let errorCount = 0;
      
      // Traducir cada clave
      for (const [key, value] of Object.entries(esContent)) {
        if (value && typeof value === 'string') {
          try {
            targetContent[key] = await translateText(value, targetLang);
            translatedCount++;
          } catch (error) {
            console.error(`   ❌ Error con clave ${key}:`, error.message);
            targetContent[key] = value; // Mantener el texto original
            errorCount++;
          }
        } else {
          targetContent[key] = value; // Mantener valores no string
        }
      }
      
      // Guardar archivo traducido
      fs.writeFileSync(targetFilePath, JSON.stringify(targetContent, null, 2));
      console.log(`💾 ${targetLang}.json guardado (${translatedCount} textos, ${errorCount} errores)`);
      
      // Delay más largo entre idiomas
      if (targetLang !== targetLanguages[targetLanguages.length - 1]) {
        console.log('⏳ Esperando 2 segundos antes del próximo idioma...');
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
    
    console.log('\n🎉 ¡Traducción completada!');
    console.log('📋 Recuerda revisar las traducciones automáticas para asegurar su calidad.');
    
  } catch (error) {
    console.error('❌ Error en el proceso de traducción:', error.message);
  }
}

// Ejecutar solo si es llamado directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  generateTranslatedFiles();
}

export { generateTranslatedFiles };