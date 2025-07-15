import React, { useState, useEffect } from 'react';
import { getProjectImageConfig, generateProjectSlug, getRandomGradient } from '../config/imageConfig';

const OptimizedPortfolioImage = ({ 
  projectId, 
  projectTitle, 
  className = "", 
  fallbackGradient = null,
  showFallback = true 
}) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentAttempt, setCurrentAttempt] = useState(0);

  // Obtener configuración del proyecto
  const projectSlug = generateProjectSlug(projectTitle);
  const projectConfig = getProjectImageConfig(projectSlug);
  const gradient = fallbackGradient || getRandomGradient();
  
  // Generar todas las posibles URLs de imagen
  const generateImageUrls = () => {
    const possibleNames = [
      projectSlug,
      `${projectSlug}-${projectId}`,
      `proyecto-${projectId}`,
      projectId.toString()
    ];

    const urls = [];
    const formatsToTry = projectConfig.formats;

    for (const name of possibleNames) {
      for (const format of formatsToTry) {
        urls.push(`/images/portfolio/${name}.${format}`);
      }
    }
    
    return urls;
  };

  const imageUrls = generateImageUrls();

  useEffect(() => {
    setIsLoading(true);
    setImageError(false);
    setCurrentAttempt(0);
    
    if (imageUrls.length > 0) {
      setImageSrc(imageUrls[0]);
    } else {
      setImageError(true);
      setIsLoading(false);
    }
  }, [projectId, projectTitle]);

  const handleImageError = () => {
    const nextAttempt = currentAttempt + 1;
    
    if (nextAttempt < imageUrls.length) {
      setCurrentAttempt(nextAttempt);
      setImageSrc(imageUrls[nextAttempt]);
    } else {
      setImageError(true);
      setIsLoading(false);
    }
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
    if (!showFallback) return null;
    
    return (
      <div className={`${className} bg-gradient-to-br ${gradient} flex items-center justify-center`}>
        <div className="text-white text-center p-4">
          <div className="text-lg font-bold mb-1">{projectTitle}</div>
          <div className="text-sm opacity-90">Imagen no disponible</div>
        </div>
      </div>
    );
  }

  return (
    <img
      src={imageSrc}
      alt={projectTitle}
      className={className}
      onError={handleImageError}
      onLoad={handleImageLoad}
      loading="lazy"
    />
  );
};

export default OptimizedPortfolioImage;