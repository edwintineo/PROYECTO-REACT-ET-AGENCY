import React, { useState, useRef, useEffect, forwardRef } from 'react';
import { motion } from 'framer-motion';
import { useImageOptimization } from '../../hooks';

/**
 * Componente de imagen altamente optimizado con múltiples estrategias de carga
 */
const OptimizedImage = forwardRef(({
  src,
  alt,
  className = '',
  width,
  height,
  lazy = true,
  priority = 'low', // 'low', 'high', 'critical'
  quality = 85,
  placeholder = 'blur', // 'blur', 'empty', 'skeleton', custom component
  blurDataURL,
  sizes,
  breakpoints = [480, 768, 1024, 1280, 1920],
  onLoad,
  onError,
  strategy = 'lazy', // 'lazy', 'eager', 'progressive'
  fallback,
  ...props
}, ref) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState('');
  const [isInView, setIsInView] = useState(!lazy);
  const imgRef = useRef(null);
  const observerRef = useRef(null);
  
  const {
    webpSupported,
    getOptimizedSrc,
    generateSrcSet,
    handleImageError,
    preloadImage
  } = useImageOptimization();

  // Generar URLs optimizadas
  const optimizedSrc = getOptimizedSrc(src, { width, height, quality });
  const srcSet = generateSrcSet(src, breakpoints);

  // Configurar Intersection Observer para lazy loading
  useEffect(() => {
    if (!lazy || !imgRef.current) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observerRef.current?.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: priority === 'high' ? '100px' : '50px'
      }
    );

    observerRef.current.observe(imgRef.current);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [lazy, priority]);

  // Precargar imagen si es crítica
  useEffect(() => {
    if (priority === 'critical' && optimizedSrc) {
      preloadImage(optimizedSrc, 'high');
    }
  }, [priority, optimizedSrc, preloadImage]);

  // Configurar src cuando la imagen está en vista
  useEffect(() => {
    if (isInView && optimizedSrc) {
      setCurrentSrc(optimizedSrc);
    }
  }, [isInView, optimizedSrc]);

  // Manejar carga de imagen
  const handleLoad = (event) => {
    setIsLoaded(true);
    onLoad?.(event);
  };

  // Manejar error de imagen
  const handleError = (event) => {
    setHasError(true);
    if (fallback) {
      setCurrentSrc(fallback);
    } else {
      handleImageError(event, fallback);
    }
    onError?.(event);
  };

  // Renderizar placeholder
  const renderPlaceholder = () => {
    if (placeholder === 'empty') return null;
    
    if (placeholder === 'skeleton') {
      return (
        <div 
          className={`animate-pulse bg-gray-200 dark:bg-gray-700 ${className}`}
          style={{ width, height }}
        />
      );
    }
    
    if (placeholder === 'blur' && blurDataURL) {
      return (
        <img
          src={blurDataURL}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover filter blur-sm scale-110 ${className}`}
          style={{ width, height }}
        />
      );
    }
    
    if (React.isValidElement(placeholder)) {
      return placeholder;
    }
    
    return (
      <div 
        className={`bg-gray-100 dark:bg-gray-800 flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <span className="text-gray-400 text-sm">Cargando...</span>
      </div>
    );
  };

  // Estrategia progressive: cargar versión de baja calidad primero
  const useProgressiveLoading = strategy === 'progressive';
  const lowQualitySrc = useProgressiveLoading 
    ? getOptimizedSrc(src, { width: Math.floor(width / 4), quality: 20 })
    : null;

  return (
    <div 
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {/* Placeholder */}
      {!isLoaded && renderPlaceholder()}
      
      {/* Progressive loading: low quality first */}
      {useProgressiveLoading && lowQualitySrc && !isLoaded && (
        <img
          src={lowQualitySrc}
          alt=""
          className="absolute inset-0 w-full h-full object-cover filter blur-sm"
          style={{ width, height }}
        />
      )}
      
      {/* Main image */}
      {webpSupported !== null && (
        <picture>
          {/* WebP source */}
          {webpSupported && srcSet && (
            <source
              srcSet={srcSet.replace(/\.(jpg|jpeg|png)/gi, '.webp')}
              sizes={sizes}
              type="image/webp"
            />
          )}
          
          {/* Fallback source */}
          {srcSet && (
            <source
              srcSet={srcSet}
              sizes={sizes}
            />
          )}
          
          <motion.img
            ref={imgRef}
            src={currentSrc}
            alt={alt}
            width={width}
            height={height}
            loading={lazy ? 'lazy' : 'eager'}
            decoding={priority === 'critical' ? 'sync' : 'async'}
            fetchPriority={priority === 'critical' ? 'high' : priority}
            onLoad={handleLoad}
            onError={handleError}
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            {...props}
          />
        </picture>
      )}
      
      {/* Error state */}
      {hasError && !fallback && (
        <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          <span className="text-gray-400 text-sm">Error al cargar imagen</span>
        </div>
      )}
    </div>
  );
});

OptimizedImage.displayName = 'OptimizedImage';

/**
 * Componente para galería de imágenes optimizada
 */
export const ImageGallery = ({ images, className = '', ...props }) => {
  const { preloadImages } = useImageOptimization();
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Precargar imágenes adyacentes
  useEffect(() => {
    const adjacentImages = [
      images[currentIndex - 1],
      images[currentIndex + 1]
    ].filter(Boolean).map(img => img.src);
    
    if (adjacentImages.length > 0) {
      preloadImages(adjacentImages, 'high');
    }
  }, [currentIndex, images, preloadImages]);
  
  return (
    <div className={`image-gallery ${className}`}>
      {images.map((image, index) => (
        <OptimizedImage
          key={index}
          {...image}
          priority={index === currentIndex ? 'high' : 'low'}
          lazy={Math.abs(index - currentIndex) > 2}
          {...props}
        />
      ))}
    </div>
  );
};

/**
 * Componente para hero images con carga crítica
 */
export const HeroImage = ({ src, alt, className = '', ...props }) => {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      className={className}
      priority="critical"
      lazy={false}
      strategy="progressive"
      placeholder="blur"
      {...props}
    />
  );
};

export default OptimizedImage;