/**
 * Utilidades para manejo de imágenes del portfolio
 * Soporta múltiples formatos: webp, png, jpg, jpeg, svg
 */

// Formatos de imagen soportados en orden de preferencia (mejor rendimiento primero)
export const SUPPORTED_IMAGE_FORMATS = ['webp', 'png', 'jpg', 'jpeg', 'svg'];

// Cache para evitar múltiples verificaciones de la misma imagen
const imageCache = new Map();

/**
 * Genera el nombre base del archivo basado en el título del proyecto
 * @param {string} title - Título del proyecto
 * @returns {string} - Nombre del archivo normalizado
 */
export const generateImageName = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remover caracteres especiales
    .replace(/\s+/g, '-') // Reemplazar espacios con guiones
    .replace(/-+/g, '-') // Remover guiones múltiples
    .replace(/^-+|-+$/g, '') // Remover guiones al inicio y final
    .trim();
};

/**
 * Verifica si una imagen existe en el servidor
 * @param {string} url - URL de la imagen
 * @returns {Promise<boolean>} - True si la imagen existe
 */
export const checkImageExists = async (url) => {
  // Verificar cache primero
  if (imageCache.has(url)) {
    return imageCache.get(url);
  }

  try {
    const response = await fetch(url, { 
      method: 'HEAD',
      cache: 'force-cache' // Usar cache del navegador
    });
    const exists = response.ok;
    
    // Guardar en cache
    imageCache.set(url, exists);
    return exists;
  } catch {
    imageCache.set(url, false);
    return false;
  }
};

/**
 * Encuentra la primera imagen disponible para un proyecto
 * @param {Object} project - Objeto del proyecto
 * @returns {Promise<string|null>} - URL de la imagen o null si no se encuentra
 */
export const findProjectImage = async (project) => {
  const { id, title, image } = project;
  
  // Si ya tiene una imagen definida, verificar si existe
  if (image) {
    const exists = await checkImageExists(image);
    if (exists) return image;
  }

  // Generar posibles nombres de archivo
  const baseName = generateImageName(title);
  const possibleNames = [
    baseName,
    `${baseName}-${id}`,
    `proyecto-${id}`,
    id.toString()
  ];

  // Buscar en todos los formatos soportados
  for (const name of possibleNames) {
    for (const format of SUPPORTED_IMAGE_FORMATS) {
      const imageUrl = `/images/portfolio/${name}.${format}`;
      const exists = await checkImageExists(imageUrl);
      
      if (exists) {
        return imageUrl;
      }
    }
  }
  
  return null;
};

/**
 * Obtiene la URL de imagen optimizada para un proyecto
 * @param {Object} project - Objeto del proyecto
 * @param {string} fallback - URL de imagen de respaldo
 * @returns {Promise<string>} - URL de la imagen
 */
export const getOptimizedImageUrl = async (project, fallback = null) => {
  const imageUrl = await findProjectImage(project);
  return imageUrl || fallback;
};

/**
 * Precargar imágenes del portfolio para mejor rendimiento
 * @param {Array} projects - Array de proyectos
 * @returns {Promise<void>}
 */
export const preloadPortfolioImages = async (projects) => {
  const imagePromises = projects.map(async (project) => {
    const imageUrl = await findProjectImage(project);
    if (imageUrl) {
      // Precargar la imagen
      const img = new Image();
      img.src = imageUrl;
    }
  });

  await Promise.allSettled(imagePromises);
};

/**
 * Limpia el cache de imágenes
 */
export const clearImageCache = () => {
  imageCache.clear();
};

/**
 * Hook personalizado para usar imágenes del portfolio
 * @param {Object} project - Objeto del proyecto
 * @returns {Object} - Estado de la imagen
 */
export const usePortfolioImage = (project) => {
  const [imageState, setImageState] = React.useState({
    src: null,
    loading: true,
    error: false
  });

  React.useEffect(() => {
    let mounted = true;

    const loadImage = async () => {
      if (!mounted) return;
      
      setImageState(prev => ({ ...prev, loading: true, error: false }));
      
      try {
        const imageSrc = await findProjectImage(project);
        
        if (!mounted) return;
        
        if (imageSrc) {
          setImageState({
            src: imageSrc,
            loading: false,
            error: false
          });
        } else {
          setImageState({
            src: null,
            loading: false,
            error: true
          });
        }
      } catch (error) {
        if (!mounted) return;
        
        setImageState({
          src: null,
          loading: false,
          error: true
        });
      }
    };

    loadImage();

    return () => {
      mounted = false;
    };
  }, [project.id, project.title, project.image]);

  return imageState;
};