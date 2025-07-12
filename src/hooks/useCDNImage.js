import { useState, useEffect, useRef } from 'react';
import { generateCDNUrl, IMAGE_OPTIMIZATION } from '../config/cdn.js';

/**
 * Hook personalizado para cargar imágenes optimizadas desde CDN
 * con lazy loading y responsive images
 */
export const useCDNImage = (imagePath, options = {}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentSrc, setCurrentSrc] = useState(null);
  const imgRef = useRef(null);
  const observerRef = useRef(null);

  const {
    lazy = true,
    width,
    height,
    format = 'auto',
    quality = 'auto',
    sizes = IMAGE_OPTIMIZATION.sizes,
    transforms = ['c_scale', 'f_auto', 'q_auto'],
    placeholder = true
  } = options;

  // Generar URLs para diferentes tamaños (responsive)
  const generateResponsiveSources = () => {
    return sizes.map(size => ({
      srcSet: generateCDNUrl(imagePath, {
        type: 'image',
        width: size,
        format,
        quality,
        transforms
      }),
      media: `(max-width: ${size}px)`
    }));
  };

  // Generar URL principal
  const mainSrc = generateCDNUrl(imagePath, {
    type: 'image',
    width,
    height,
    format,
    quality,
    transforms
  });

  // Generar placeholder (versión borrosa y pequeña)
  const placeholderSrc = placeholder ? generateCDNUrl(imagePath, {
    type: 'image',
    width: 50,
    quality: 30,
    transforms: [...transforms, 'e_blur:300']
  }) : null;

  // Función para cargar la imagen
  const loadImage = () => {
    if (isLoading || isLoaded) return;
    
    setIsLoading(true);
    setError(null);

    const img = new Image();
    
    img.onload = () => {
      setCurrentSrc(mainSrc);
      setIsLoaded(true);
      setIsLoading(false);
    };
    
    img.onerror = () => {
      setError('Error al cargar la imagen');
      setIsLoading(false);
    };
    
    img.src = mainSrc;
  };

  // Intersection Observer para lazy loading
  useEffect(() => {
    if (!lazy) {
      loadImage();
      return;
    }

    if (!imgRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadImage();
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '50px 0px', // Cargar 50px antes de que sea visible
        threshold: 0.1
      }
    );

    observerRef.current.observe(imgRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [lazy, mainSrc]);

  // Limpiar observer al desmontar
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return {
    imgRef,
    src: currentSrc || (placeholder ? placeholderSrc : null),
    mainSrc,
    placeholderSrc,
    responsiveSources: generateResponsiveSources(),
    isLoaded,
    isLoading,
    error,
    loadImage
  };
};

/**
 * Hook para precargar imágenes críticas
 */
export const usePreloadImages = (imagePaths = []) => {
  const [preloadedCount, setPreloadedCount] = useState(0);
  const [isPreloading, setIsPreloading] = useState(false);

  useEffect(() => {
    if (imagePaths.length === 0) return;

    setIsPreloading(true);
    let loadedCount = 0;

    const preloadPromises = imagePaths.map((imagePath) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          loadedCount++;
          setPreloadedCount(loadedCount);
          resolve(imagePath);
        };
        img.onerror = reject;
        img.src = generateCDNUrl(imagePath, {
          type: 'image',
          format: 'auto',
          quality: 'auto'
        });
      });
    });

    Promise.allSettled(preloadPromises).finally(() => {
      setIsPreloading(false);
    });
  }, [imagePaths]);

  return {
    preloadedCount,
    totalImages: imagePaths.length,
    isPreloading,
    progress: imagePaths.length > 0 ? (preloadedCount / imagePaths.length) * 100 : 0
  };
};

export default useCDNImage;