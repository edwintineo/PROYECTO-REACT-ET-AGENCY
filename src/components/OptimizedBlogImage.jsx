import React, { useState, useEffect } from 'react';
import { getBlogImage } from '../utils/imageImports';

const OptimizedBlogImage = ({ 
  imageName, 
  alt, 
  className = "",
  fallbackText = "Imagen no disponible"
}) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setImageError(false);
    
    // Obtener la imagen usando el sistema de importaciones dinámicas
    const imageUrl = getBlogImage(imageName);
    
    if (imageUrl) {
      setImageSrc(imageUrl);
    } else {
      setImageError(true);
      setIsLoading(false);
    }
  }, [imageName]);

  const handleImageError = () => {
    setImageError(true);
    setIsLoading(false);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
    setImageError(false);
  };

  if (isLoading && !imageSrc) {
    return (
      <div className={`${className} bg-gray-200 animate-pulse flex items-center justify-center`}>
        <div className="text-gray-400">Cargando...</div>
      </div>
    );
  }

  if (imageError || !imageSrc) {
    return (
      <div className={`${className} bg-gray-100 flex items-center justify-center`}>
        <div className="text-gray-500 text-center p-4">
          <div className="text-sm">{fallbackText}</div>
        </div>
      </div>
    );
  }

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      onError={handleImageError}
      onLoad={handleImageLoad}
      loading="lazy"
    />
  );
};

export default OptimizedBlogImage;