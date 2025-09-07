// scripts/generate-translations.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Para manejar __dirname en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Contenido base para todos los archivos de traducción
const baseTranslation = {
  "productCode": "",
  "productCategory": "",
  "registrationNumber": "",
  "sellAsPackaged": "",
  "safetyInstructions": "",
  "outdoorUse": "",
  "usageInstructions": "",
  "safetyDistancePublic": "",
  "nec": "",
  "necValue": "",
  "age": "",
  "ageValue": "",
  "safetyDistance": "",
  "safetyDistanceValue": "",
  "adr": "",
  "riskCategory": "",
  "unClassification": "",
  "riskWarning": "",
  "downloadFDS": "",
  "productTitle": "",
  "productSubtitle": "",
  "productDescription": "",
  "loading": ""
};

// Contenido específico para español
const spanishContent = {
  "productCode": "Código: 0372",
  "productCategory": "CATEGORÍA F3",
  "registrationNumber": "Nº de registro: 0163-F3-2748",
  "sellAsPackaged": "Debe venderse tal y como viene envasado",
  "safetyInstructions": "INSTRUCCIONES DE SEGURIDAD",
  "outdoorUse": "Para uso exclusivo al aire libre.",
  "usageInstructions": "Colocar de uno en uno en el suelo, encender la mecha por su extremo y retirarse inmediatamente al menos a 15m.",
  "safetyDistancePublic": "El público debe estar al menos a 25 m. de distancia",
  "nec": "NEC",
  "necValue": "4.3g",
  "age": "EDAD",
  "ageValue": "+18 años",
  "safetyDistance": "DISTANCIA DE SEGURIDAD",
  "safetyDistanceValue": "15m",
  "adr": "ADR",
  "riskCategory": "Categoría de riesgo: 1.4G",
  "unClassification": "Clasificación ONU: 0336 - Artículos pirotécnicos para usos Técnicos",
  "riskWarning": "Peligro de incendio o proyección: Mantener lejos de fuentes de calor...",
  "downloadFDS": "Descargar FDS",
  "productTitle": "Trueno El Toro",
  "productSubtitle": "Trueno detonante",
  "productDescription": "Caja de 5 truenos de mecha de estopín que realizan una explosión de impresionante intensidad",
  "loading": "Cargando..."
};

// Lista de todos los idiomas soportados
const languages = [
  'es', 'fr', 'de', 'bg', 'da', 'et', 'el', 'en', 'fi', 'ga',
  'hr', 'hu', 'it', 'lv', 'lt', 'mt', 'nl', 'pl', 'pt', 'ro',
  'sk', 'sl', 'sv', 'cs', 'ca'
];

// Ruta de la carpeta locales
const localesDir = path.join(__dirname, '../src/locales');

// Crear directorio si no existe
if (!fs.existsSync(localesDir)) {
  fs.mkdirSync(localesDir, { recursive: true });
  console.log('📁 Directorio locales creado');
}

// Función para generar archivos
const generateTranslationFiles = () => {
  console.log('🚀 Generando archivos de traducción...\n');
  
  let createdCount = 0;
  let updatedCount = 0;

  languages.forEach(lang => {
    const filePath = path.join(localesDir, `${lang}.json`);
    
    // Contenido específico para español, base para los demás
    const content = lang === 'es' ? spanishContent : baseTranslation;
    
    try {
      if (fs.existsSync(filePath)) {
        // Si el archivo existe, no lo sobrescribimos
        console.log(`✅ ${lang}.json ya existe (no se modificó)`);
        updatedCount++;
      } else {
        // Crear nuevo archivo
        fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
        console.log(`📝 ${lang}.json creado`);
        createdCount++;
      }
    } catch (error) {
      console.error(`❌ Error creando ${lang}.json:`, error.message);
    }
  });

  console.log('\n📊 Resumen:');
  console.log(`📝 Archivos creados: ${createdCount}`);
  console.log(`✅ Archivos existentes: ${updatedCount}`);
  console.log(`🌍 Total de idiomas: ${languages.length}`);
  
  console.log('\n🎯 ¡Proceso completado!');
  console.log('\n📋 Próximos pasos:');
  console.log('1. Completa el contenido en src/locales/es.json');
  console.log('2. Traduce los demás archivos o usa un servicio de traducción');
  console.log('3. Ejecuta este script nuevamente si añades más claves');
};

// Ejecutar el script
generateTranslationFiles();