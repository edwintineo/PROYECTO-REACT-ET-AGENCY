/**
 * Configuración para el manejo de imágenes del portfolio
 */

// Configuración específica de imágenes por proyecto
export const PROJECT_IMAGE_CONFIG = {
  'carpediem-online': 'webp',
  'marbelma': 'webp',
  'cimientos-asesores': 'webp',
  'energia-sexy': 'webp',
  'stec-ingenieria': 'webp',
  'bingo-store': 'webp',
  'tecservin': 'webp',
  'pallets-ray': 'webp',
  'asanar-centro-medico': 'webp',
  'club-90': 'webp',
  'wayku-peruano': 'webp',
  'adc-arquitectura': 'webp',
  'mailon-propiedades': 'webp',
  'sensation-free': 'webp',
  'maestro-del-mueble': 'webp',
  'saldias-instalaciones': 'webp',
  'varitech': 'webp',
  'bmc-store': 'webp',
  'tekno-kont': 'webp',
  'deco-larrondo': 'webp',
  'full-time': 'webp',
  'plegados-metales': 'webp',
  'marcel-fischer': 'webp',
  'corretaje-araucania': 'webp',
  'almacen-hilados': 'webp',
  'accesorios-bebe': 'webp',
  'aceite-oliva-eyes': 'webp',
  'berkese': 'webp',
  'serv-cel-syc': 'webp'
};

// Configuración global de imágenes
import placeholderImage from '@/assets/images/placeholder.svg';

export const GLOBAL_IMAGE_CONFIG = {
  supportedFormats: ['webp', 'svg', 'jpg', 'png'],
  fallbackOrder: ['webp', 'svg', 'jpg', 'png'],
  defaultFormat: 'webp',
  lazyLoading: true,
  placeholder: placeholderImage
};

/**
 * Obtiene la configuración de imagen para un proyecto específico
 * @param {string} projectSlug - Slug del proyecto
 * @returns {Object} - Configuración del proyecto
 */
export const getProjectImageConfig = (projectSlug) => {
  return PROJECT_IMAGE_CONFIG[projectSlug] || {
    formats: GLOBAL_IMAGE_CONFIG.supportedFormats,
    preferredFormat: GLOBAL_IMAGE_CONFIG.fallbackFormat
  };
};

/**
 * Genera el slug del proyecto basado en el título
 * @param {string} title - Título del proyecto
 * @returns {string} - Slug del proyecto
 */
export const generateProjectSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
    .trim();
};

/**
 * Obtiene un gradiente aleatorio para el placeholder
 * @returns {string} - Clase de gradiente de Tailwind
 */
export const getRandomGradient = () => {
  const gradients = GLOBAL_IMAGE_CONFIG.placeholder.gradients;
  return gradients[Math.floor(Math.random() * gradients.length)];
};