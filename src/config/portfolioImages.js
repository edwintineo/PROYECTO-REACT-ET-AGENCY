// Portfolio images imports
import carpediemOnline from '../assets/portfolio/carpediem-online.svg';
import marbelma from '../assets/portfolio/marbelma.svg';
import cimientosAsesores from '../assets/portfolio/cimientos-asesores.svg';

// Portfolio images mapping
export const portfolioImages = {
  'carpediem-online': carpediemOnline,
  'marbelma': marbelma,
  'cimientos-asesores': cimientosAsesores,
};

// Function to get portfolio image by project ID or slug
export const getPortfolioImage = (imageKey) => {
  return portfolioImages[imageKey] || null;
};

// Function to get image from path (fallback for existing paths)
export const getImageFromPath = (imagePath) => {
  if (!imagePath) return null;
  
  // Extract filename from path like "/images/portfolio/carpediem-online.webp"
  const filename = imagePath.split('/').pop();
  const key = filename?.replace(/\.(webp|jpg|jpeg|png|svg)$/, '');
  
  return getPortfolioImage(key);
};