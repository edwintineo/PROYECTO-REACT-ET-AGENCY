import portfolioData from '../data/portfolio.json';

/**
 * Obtiene los proyectos más recientes del portafolio
 * @param {number} limit - Número de proyectos a retornar
 * @returns {Array} Array de proyectos ordenados por año (más recientes primero)
 */
export const getRecentProjects = (limit = 3) => {
  return portfolioData.projects
    .sort((a, b) => b.year - a.year || b.id - a.id)
    .slice(0, limit);
};

/**
 * Obtiene todos los proyectos del portafolio
 * @returns {Array} Array de todos los proyectos
 */
export const getAllProjects = () => {
  return portfolioData.projects;
};

/**
 * Obtiene proyectos filtrados por categoría
 * @param {string} category - Categoría a filtrar
 * @returns {Array} Array de proyectos filtrados
 */
export const getProjectsByCategory = (category) => {
  if (category === 'Todos' || !category) {
    return portfolioData.projects;
  }
  return portfolioData.projects.filter(project => project.category === category);
};

/**
 * Obtiene un proyecto por su ID
 * @param {number} id - ID del proyecto
 * @returns {Object|null} Proyecto encontrado o null
 */
export const getProjectById = (id) => {
  return portfolioData.projects.find(project => project.id === parseInt(id)) || null;
};

/**
 * Obtiene todas las categorías únicas de proyectos
 * @returns {Array} Array de categorías únicas
 */
export const getProjectCategories = () => {
  const categories = portfolioData.projects.map(project => project.category);
  return ['Todos', ...new Set(categories)];
};

/**
 * Obtiene estadísticas del portafolio
 * @returns {Object} Objeto con estadísticas
 */
export const getPortfolioStats = () => {
  const projects = portfolioData.projects;
  const categories = getProjectCategories().filter(cat => cat !== 'Todos');
  
  return {
    totalProjects: projects.length,
    categories: categories.length,
    latestYear: Math.max(...projects.map(p => p.year)),
    avgDuration: projects.reduce((acc, p) => {
      const months = parseFloat(p.duration.replace(' meses', '').replace(' mes', ''));
      return acc + months;
    }, 0) / projects.length
  };
};