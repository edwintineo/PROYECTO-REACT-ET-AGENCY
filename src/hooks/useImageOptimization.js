import { useState, useEffect, useCallback } from 'react';

/**
 * Hook para optimización avanzada de imágenes
 * Incluye detección de soporte WebP, preload de imágenes críticas y gestión de errores
 */
export const useImageOptimization = () => {
  const [webpSupported, setWebpSupported] = useState(null);
  const [preloadedImages, setPreloadedImages] = useState(new Set());

  // Detectar soporte para WebP
  useEffect(() => {
    const checkWebPSupport = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = 'rgba(0,0,0,0)';
      ctx.fillRect(0, 0, 1, 1);
      
      const dataURL = canvas.toDataURL('image/webp');
      setWebpSupported(dataURL.indexOf('data:image/webp') === 0);
    };

    checkWebPSupport();
  }, []);

  // Función para precargar imágenes críticas
  const preloadImage = useCallback((src, priority = 'low') => {
    if (!src || preloadedImages.has(src)) return Promise.resolve();

    return new Promise((resolve, reject) => {
      const img = new Image();
      
      // Configurar prioridad de carga
      if (priority === 'high') {
        img.fetchPriority = 'high';
      }
      
      img.onload = () => {
        setPreloadedImages(prev => new Set([...prev, src]));
        resolve(img);
      };
      
      img.onerror = () => {
        console.warn(`Failed to preload image: ${src}`);
        reject(new Error(`Failed to preload image: ${src}`));
      };
      
      img.src = src;
    });
  }, [preloadedImages]);

  // Función para precargar múltiples imágenes
  const preloadImages = useCallback(async (images, priority = 'low') => {
    const promises = images.map(src => preloadImage(src, priority));
    
    try {
      await Promise.allSettled(promises);
    } catch (error) {
      console.warn('Some images failed to preload:', error);
    }
  }, [preloadImage]);

  // Función para generar srcSet responsivo
  const generateSrcSet = useCallback((baseSrc, breakpoints = [480, 768, 1024, 1280]) => {
    if (!baseSrc) return '';
    
    const extension = baseSrc.split('.').pop();
    const baseName = baseSrc.replace(`.${extension}`, '');
    
    return breakpoints
      .map(width => `${baseName}_${width}w.${webpSupported ? 'webp' : extension} ${width}w`)
      .join(', ');
  }, [webpSupported]);

  // Función para obtener la URL optimizada
  const getOptimizedSrc = useCallback((src, options = {}) => {
    if (!src) return '';
    
    const {
      width,
      height,
      quality = 85,
      format = 'auto'
    } = options;
    
    // Si WebP es soportado y el formato es auto, usar WebP
    if (webpSupported && format === 'auto') {
      const extension = src.split('.').pop();
      if (['jpg', 'jpeg', 'png'].includes(extension.toLowerCase())) {
        src = src.replace(`.${extension}`, '.webp');
      }
    }
    
    // Agregar parámetros de optimización si están disponibles
    const params = new URLSearchParams();
    if (width) params.append('w', width);
    if (height) params.append('h', height);
    if (quality !== 85) params.append('q', quality);
    
    const queryString = params.toString();
    return queryString ? `${src}?${queryString}` : src;
  }, [webpSupported]);

  // Función para lazy load con Intersection Observer
  const createLazyLoader = useCallback((threshold = 0.1, rootMargin = '50px') => {
    return new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.dataset.src;
            
            if (src) {
              img.src = src;
              img.removeAttribute('data-src');
              img.classList.remove('lazy');
              img.classList.add('loaded');
            }
          }
        });
      },
      {
        threshold,
        rootMargin
      }
    );
  }, []);

  // Función para manejar errores de carga de imágenes
  const handleImageError = useCallback((event, fallbackSrc) => {
    const img = event.target;
    
    if (fallbackSrc && img.src !== fallbackSrc) {
      img.src = fallbackSrc;
    } else {
      // Mostrar placeholder por defecto
      img.style.display = 'none';
      
      // Crear elemento de placeholder
      const placeholder = document.createElement('div');
      placeholder.className = 'image-placeholder bg-gray-200 dark:bg-gray-700 flex items-center justify-center';
      placeholder.style.width = img.width || '100%';
      placeholder.style.height = img.height || '200px';
      placeholder.innerHTML = '<span class="text-gray-400">Imagen no disponible</span>';
      
      img.parentNode.insertBefore(placeholder, img);
    }
  }, []);

  return {
    webpSupported,
    preloadImage,
    preloadImages,
    generateSrcSet,
    getOptimizedSrc,
    createLazyLoader,
    handleImageError,
    isPreloaded: (src) => preloadedImages.has(src)
  };
};

/**
 * Hook para gestión de imágenes críticas
 * Precarga automáticamente las imágenes más importantes
 */
export const useCriticalImages = (criticalImages = []) => {
  const { preloadImages } = useImageOptimization();
  const [isLoading, setIsLoading] = useState(true);
  const [loadedCount, setLoadedCount] = useState(0);

  useEffect(() => {
    if (criticalImages.length === 0) {
      setIsLoading(false);
      return;
    }

    const loadCriticalImages = async () => {
      setIsLoading(true);
      
      try {
        const promises = criticalImages.map(async (src, index) => {
          await preloadImages([src], 'high');
          setLoadedCount(index + 1);
        });
        
        await Promise.all(promises);
      } catch (error) {
        console.warn('Error loading critical images:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCriticalImages();
  }, [criticalImages, preloadImages]);

  return {
    isLoading,
    loadedCount,
    totalCount: criticalImages.length,
    progress: criticalImages.length > 0 ? (loadedCount / criticalImages.length) * 100 : 100
  };
};

export default useImageOptimization;