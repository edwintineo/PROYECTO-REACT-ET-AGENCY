import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * Optimized Image component with lazy loading and WebP support
 */
const Image = ({
  src,
  alt,
  className = '',
  width,
  height,
  lazy = true,
  webp = true,
  placeholder = '/images/placeholder.svg',
  onLoad,
  onError,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(placeholder);
  const imgRef = useRef(null);

  // Generate WebP source if enabled
  const getWebPSrc = (originalSrc) => {
    if (!webp || !originalSrc) return null;
    
    // Convert common image extensions to WebP
    const webpSrc = originalSrc
      .replace(/\.(jpg|jpeg|png)$/i, '.webp')
      .replace(/\.(svg)$/i, '.svg'); // Keep SVG as is
    
    return webpSrc !== originalSrc ? webpSrc : null;
  };

  const webpSrc = getWebPSrc(src);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    setCurrentSrc(src); // Fallback to original
    onError?.();
  };

  const handleWebPError = () => {
    setCurrentSrc(src); // Fallback to original format
  };

  useEffect(() => {
    if (!lazy) {
      setCurrentSrc(src);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCurrentSrc(webpSrc || src);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [src, webpSrc, lazy]);

  // If WebP is supported and available, use picture element
  if (webp && webpSrc && webpSrc !== src) {
    return (
      <picture ref={imgRef} className={className}>
        <source
          srcSet={lazy ? (currentSrc === placeholder ? '' : webpSrc) : webpSrc}
          type="image/webp"
          onError={handleWebPError}
        />
        <motion.img
          src={currentSrc}
          alt={alt}
          width={width}
          height={height}
          loading={lazy ? 'lazy' : 'eager'}
          onLoad={handleLoad}
          onError={handleError}
          className={`transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          {...props}
        />
      </picture>
    );
  }

  // Standard img element with lazy loading
  return (
    <motion.img
      ref={imgRef}
      src={currentSrc}
      alt={alt}
      width={width}
      height={height}
      loading={lazy ? 'lazy' : 'eager'}
      onLoad={handleLoad}
      onError={handleError}
      className={`transition-opacity duration-300 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      } ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      {...props}
    />
  );
};

/**
 * Responsive Image component with multiple breakpoints
 */
export const ResponsiveImage = ({
  src,
  alt,
  sizes = {
    mobile: '100vw',
    tablet: '50vw',
    desktop: '33vw'
  },
  breakpoints = {
    mobile: 640,
    tablet: 1024,
    desktop: 1280
  },
  ...props
}) => {
  const generateSrcSet = (baseSrc) => {
    const srcSet = [];
    
    Object.entries(breakpoints).forEach(([device, width]) => {
      const deviceSrc = baseSrc.replace(
        /(\.[^.]+)$/,
        `_${width}w$1`
      );
      srcSet.push(`${deviceSrc} ${width}w`);
    });
    
    return srcSet.join(', ');
  };

  const sizesString = Object.entries(sizes)
    .map(([device, size]) => {
      const breakpoint = breakpoints[device];
      return device === 'mobile' 
        ? size 
        : `(min-width: ${breakpoint}px) ${size}`;
    })
    .reverse()
    .join(', ');

  return (
    <Image
      src={src}
      alt={alt}
      srcSet={generateSrcSet(src)}
      sizes={sizesString}
      {...props}
    />
  );
};

/**
 * Avatar Image component with fallback
 */
export const AvatarImage = ({
  src,
  alt,
  size = 'md',
  fallback,
  className = '',
  ...props
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div className={`${sizeClasses[size]} bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center ${className}`}>
        {fallback || (
          <span className="text-gray-500 dark:text-gray-400 font-medium">
            {alt?.charAt(0)?.toUpperCase() || '?'}
          </span>
        )}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      onError={() => setHasError(true)}
      className={`${sizeClasses[size]} rounded-full object-cover ${className}`}
      {...props}
    />
  );
};

export default Image;