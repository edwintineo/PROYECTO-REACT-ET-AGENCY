// Configuración de imágenes del blog
import tendenciasDiseno from '../assets/blog/tendencias-diseno-web-2025.svg'
import seoLocal from '../assets/blog/seo-local-chile.svg'
import ecommerceWebpay from '../assets/blog/ecommerce-webpay-plus.svg'

// Imagen genérica para posts sin imagen específica
const genericBlogImage = `data:image/svg+xml,${encodeURIComponent(`
<svg width="600" height="400" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="genericGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#6366F1;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#4338CA;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="600" height="400" fill="url(#genericGradient)"/>
  <circle cx="300" cy="200" r="80" fill="rgba(255,255,255,0.2)"/>
  <rect x="250" y="170" width="100" height="60" fill="rgba(255,255,255,0.3)" rx="10"/>
  <text x="300" y="350" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="24" font-weight="bold">ET Agency Blog</text>
</svg>
`)}`

// Mapeo de imágenes del blog
export const blogImages = {
  '/images/blog/tendencias-diseno-web-2025.svg': tendenciasDiseno,
  '/images/blog/seo-local-chile.svg': seoLocal,
  '/images/blog/ecommerce-webpay-plus.svg': ecommerceWebpay,
  '/images/blog/marketing-digital-pymes.svg': genericBlogImage,
  '/images/blog/velocidad-carga-web.svg': genericBlogImage,
  '/images/blog/diseno-responsive.svg': genericBlogImage,
  '/images/blog/seo-tecnico.svg': genericBlogImage,
  '/images/blog/conversiones-ecommerce.svg': genericBlogImage,
  '/images/blog/automatizacion-procesos.svg': genericBlogImage,
}

// Función para obtener imagen por ruta
export const getBlogImageFromPath = (imagePath) => {
  return blogImages[imagePath] || genericBlogImage
}

// Función para obtener imagen por categoría
export const getBlogImageByCategory = (category) => {
  const categoryMap = {
    'diseno-web': tendenciasDiseno,
    'seo': seoLocal,
    'ecommerce': ecommerceWebpay,
    'marketing': genericBlogImage,
    'tecnologia': genericBlogImage,
  }
  return categoryMap[category] || genericBlogImage
}

export default {
  blogImages,
  getBlogImageFromPath,
  getBlogImageByCategory,
  genericBlogImage,
}