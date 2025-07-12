/**
 * Generador automático de sitemap para ET Agency
 * Genera sitemap.xml dinámicamente basado en las rutas de la aplicación
 */

// Configuración de rutas y prioridades
const routes = [
  {
    path: '/',
    priority: 1.0,
    changefreq: 'weekly',
    title: 'Inicio - Agencia Marketing Digital Chile'
  },
  {
    path: '/servicios',
    priority: 0.9,
    changefreq: 'monthly',
    title: 'Servicios - Diseño Web y E-commerce'
  },
  {
    path: '/servicios-seo',
    priority: 0.9,
    changefreq: 'monthly',
    title: 'Servicios SEO - Posicionamiento Web Chile'
  },
  {
    path: '/portfolio',
    priority: 0.8,
    changefreq: 'weekly',
    title: 'Portfolio - Casos de Éxito'
  },
  {
    path: '/acerca-de',
    priority: 0.7,
    changefreq: 'monthly',
    title: 'Acerca de ET Agency'
  },
  {
    path: '/contacto',
    priority: 0.8,
    changefreq: 'monthly',
    title: 'Contacto - Cotización Gratuita'
  },
  {
    path: '/faq',
    priority: 0.6,
    changefreq: 'monthly',
    title: 'Preguntas Frecuentes'
  },
  {
    path: '/blog',
    priority: 0.7,
    changefreq: 'weekly',
    title: 'Blog - Marketing Digital'
  },
  {
    path: '/terminos',
    priority: 0.3,
    changefreq: 'yearly',
    title: 'Términos y Condiciones'
  }
];

/**
 * Genera el contenido XML del sitemap
 * @param {string} baseUrl - URL base del sitio
 * @returns {string} Contenido XML del sitemap
 */
export const generateSitemap = (baseUrl = 'https://etagency.cl') => {
  const currentDate = new Date().toISOString().split('T')[0];
  
  const urlEntries = routes.map(route => {
    const fullUrl = `${baseUrl}${route.path === '/' ? '' : route.path}`;
    
    return `  <url>
    <loc>${fullUrl}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
};

/**
 * Genera sitemap con metadatos adicionales
 * @param {string} baseUrl - URL base del sitio
 * @returns {Object} Objeto con sitemap y metadatos
 */
export const generateSitemapWithMeta = (baseUrl = 'https://etagency.cl') => {
  const sitemap = generateSitemap(baseUrl);
  const totalUrls = routes.length;
  const lastModified = new Date().toISOString();
  
  return {
    sitemap,
    meta: {
      totalUrls,
      lastModified,
      baseUrl,
      generatedAt: new Date().toISOString()
    }
  };
};

/**
 * Obtiene todas las rutas configuradas
 * @returns {Array} Array de rutas con metadatos
 */
export const getAllRoutes = () => routes;

/**
 * Valida si una ruta existe en el sitemap
 * @param {string} path - Ruta a validar
 * @returns {boolean} True si la ruta existe
 */
export const isValidRoute = (path) => {
  return routes.some(route => route.path === path);
};

/**
 * Obtiene la configuración de una ruta específica
 * @param {string} path - Ruta a buscar
 * @returns {Object|null} Configuración de la ruta o null
 */
export const getRouteConfig = (path) => {
  return routes.find(route => route.path === path) || null;
};

export default {
  generateSitemap,
  generateSitemapWithMeta,
  getAllRoutes,
  isValidRoute,
  getRouteConfig
};