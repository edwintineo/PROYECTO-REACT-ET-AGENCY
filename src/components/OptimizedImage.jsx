import React from 'react';
import { useCDNImage } from '../hooks/useCDNImage.js';

/**
 * Componente de imagen optimizada con CDN, lazy loading y responsive design
 */
const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className = '',
  lazy = true,
  placeholder = true,
  format = 'auto',
  quality = 'auto',
  sizes,
  transforms = [],
  fallbackSrc,
  onLoad,
  onError,
  ...props
}) => {
  const {
    imgRef,
    src: optimizedSrc,
    placeholderSrc,
    responsiveSources,
    isLoaded,
    isLoading,
    error
  } = useCDNImage(src, {
    lazy,
    width,
    height,
    format,
    quality,
    sizes,
    transforms,
    placeholder
  });

  // Manejar eventos
  const handleLoad = (e) => {
    onLoad?.(e);
  };

  const handleError = (e) => {
    onError?.(e);
    // Si hay fallback, intentar cargar la imagen de respaldo
    if (fallbackSrc && e.target.src !== fallbackSrc) {
      e.target.src = fallbackSrc;
    }
  };

  // Clases CSS para transiciones suaves
  const imageClasses = `
    ${className}
    transition-all duration-300 ease-in-out
    ${isLoading ? 'opacity-50 blur-sm' : ''}
    ${isLoaded ? 'opacity-100 blur-0' : ''}
    ${error ? 'opacity-75 grayscale' : ''}
  `.trim();

  // Si hay error y no hay fallback, mostrar placeholder
  if (error && !fallbackSrc) {
    return (
      <div 
        className={`${className} bg-gray-200 dark:bg-gray-700 flex items-center justify-center`}
        style={{ width, height }}
      >
        <svg 
          className="w-8 h-8 text-gray-400" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
          />
        </svg>
      </div>
    );
  }

  return (
    <picture className="block">
      {/* Sources responsivas para diferentes tamaños */}
      {responsiveSources.map((source, index) => (
        <source
          key={index}
          srcSet={source.srcSet}
          media={source.media}
          type={format === 'webp' ? 'image/webp' : undefined}
        />
      ))}
      
      {/* Imagen principal */}
      <img
        ref={imgRef}
        src={optimizedSrc}
        alt={alt}
        width={width}
        height={height}
        className={imageClasses}
        loading={lazy ? 'lazy' : 'eager'}
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </picture>
  );
};

/**
 * Componente de imagen de fondo optimizada
 */
export const OptimizedBackgroundImage = ({
  src,
  children,
  className = '',
  width,
  height,
  format = 'auto',
  quality = 'auto',
  transforms = [],
  ...props
}) => {
  const { src: optimizedSrc, isLoaded, isLoading } = useCDNImage(src, {
    lazy: true,
    width,
    height,
    format,
    quality,
    transforms,
    placeholder: false
  });

  const backgroundStyle = {
    backgroundImage: optimizedSrc ? `url(${optimizedSrc})` : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  };

  const containerClasses = `
    ${className}
    transition-all duration-500 ease-in-out
    ${isLoading ? 'bg-gray-200 dark:bg-gray-700' : ''}
    ${isLoaded ? 'opacity-100' : 'opacity-0'}
  `.trim();

  return (
    <div
      className={containerClasses}
      style={backgroundStyle}
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * Componente de avatar optimizado
 */
export const OptimizedAvatar = ({
  src,
  alt,
  size = 40,
  className = '',
  fallbackInitials,
  ...props
}) => {
  const { src: optimizedSrc, isLoaded, error } = useCDNImage(src, {
    lazy: true,
    width: size * 2, // 2x para pantallas retina
    height: size * 2,
    format: 'auto',
    quality: 'auto',
    transforms: ['c_fill', 'g_face', 'r_max']
  });

  if (error || !optimizedSrc) {
    return (
      <div
        className={`
          ${className}
          bg-gradient-to-br from-blue-500 to-purple-600
          flex items-center justify-center
          text-white font-semibold
          rounded-full
        `}
        style={{ width: size, height: size }}
        {...props}
      >
        {fallbackInitials || '?'}
      </div>
    );
  }

  return (
    <img
      src={optimizedSrc}
      alt={alt}
      width={size}
      height={size}
      className={`
        ${className}
        rounded-full object-cover
        transition-opacity duration-300
        ${isLoaded ? 'opacity-100' : 'opacity-0'}
      `}
      loading="lazy"
      decoding="async"
      {...props}
    />
  );
};

export default OptimizedImage;