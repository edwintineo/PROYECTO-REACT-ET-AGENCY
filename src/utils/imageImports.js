/**
 * Importaciones dinámicas de imágenes para Vite/Vercel
 * Este archivo resuelve el problema de las imágenes que no cargan en producción
 */

// Importar todas las imágenes del portfolio
const portfolioImages = import.meta.glob('../assets/images/portfolio/*.{png,jpg,jpeg,svg,webp}', {
  eager: true,
  as: 'url'
});

// Importar todas las imágenes del blog
const blogImages = import.meta.glob('../assets/images/blog/*.{png,jpg,jpeg,svg,webp}', {
  eager: true,
  as: 'url'
});

// Crear mapas de imágenes para acceso rápido
const portfolioImageMap = {};
const blogImageMap = {};

// Procesar imágenes del portfolio
Object.entries(portfolioImages).forEach(([path, url]) => {
  const filename = path.split('/').pop().split('.')[0];
  portfolioImageMap[filename] = url;
});

// Procesar imágenes del blog
Object.entries(blogImages).forEach(([path, url]) => {
  const filename = path.split('/').pop().split('.')[0];
  blogImageMap[filename] = url;
});

/**
 * Obtiene la URL de una imagen del portfolio
 * @param {string} imageName - Nombre del archivo sin extensión
 * @returns {string|null} - URL de la imagen o null si no existe
 */
export const getPortfolioImage = (imageName) => {
  return portfolioImageMap[imageName] || null;
};

/**
 * Obtiene la URL de una imagen del blog
 * @param {string} imageName - Nombre del archivo sin extensión
 * @returns {string|null} - URL de la imagen o null si no existe
 */
export const getBlogImage = (imageName) => {
  return blogImageMap[imageName] || null;
};

/**
 * Obtiene la URL de una imagen del portfolio con fallback
 * @param {string} projectTitle - Título del proyecto
 * @param {number} projectId - ID del proyecto
 * @returns {string|null} - URL de la imagen o null si no existe
 */
export const getPortfolioImageWithFallback = (projectTitle, projectId) => {
  // Generar slug del proyecto
  const slug = projectTitle
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();

  // Intentar diferentes variaciones del nombre
  const possibleNames = [
    slug,
    `${slug}-${projectId}`,
    `proyecto-${projectId}`,
    projectId.toString()
  ];

  for (const name of possibleNames) {
    const image = getPortfolioImage(name);
    if (image) return image;
  }

  return null;
};

/**
 * Lista todas las imágenes disponibles del portfolio
 * @returns {Object} - Mapa de todas las imágenes del portfolio
 */
export const getAllPortfolioImages = () => {
  return { ...portfolioImageMap };
};

/**
 * Lista todas las imágenes disponibles del blog
 * @returns {Object} - Mapa de todas las imágenes del blog
 */
export const getAllBlogImages = () => {
  return { ...blogImageMap };
};

// Exportar los mapas para debugging
export { portfolioImageMap, blogImageMap };