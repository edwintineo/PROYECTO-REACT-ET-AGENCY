// Configuración CDN para assets estáticos

// URLs de CDN populares para librerías comunes
export const CDN_URLS = {
  // Google Fonts CDN
  fonts: {
    base: 'https://fonts.googleapis.com',
    api: 'https://fonts.googleapis.com/css2'
  },
  
  // CDN para iconos y assets
  icons: {
    lucide: 'https://cdn.jsdelivr.net/npm/lucide@latest/dist/umd/lucide.js',
    heroicons: 'https://cdn.jsdelivr.net/npm/heroicons@2.0.18/24/outline'
  },
  
  // CDN para librerías JS (fallback)
  libraries: {
    react: 'https://unpkg.com/react@18/umd/react.production.min.js',
    reactDom: 'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js',
    framerMotion: 'https://unpkg.com/framer-motion@10/dist/framer-motion.js'
  },
  
  // CDN para assets de imágenes
  images: {
    // Cloudinary para optimización automática de imágenes
    cloudinary: 'https://res.cloudinary.com/demo/image/upload',
    // jsDelivr para assets estáticos
    jsdelivr: 'https://cdn.jsdelivr.net/gh',
    // Unsplash para imágenes de placeholder
    unsplash: 'https://images.unsplash.com'
  }
};

// Configuración de optimización de imágenes
export const IMAGE_OPTIMIZATION = {
  formats: ['webp', 'avif', 'jpg', 'png'],
  sizes: [320, 480, 768, 1024, 1280, 1920],
  quality: {
    webp: 85,
    avif: 80,
    jpg: 85,
    png: 90
  },
  // Transformaciones automáticas
  transforms: {
    auto: 'f_auto,q_auto',
    responsive: 'w_auto,c_scale',
    progressive: 'fl_progressive'
  }
};

// Función para generar URLs de CDN optimizadas
export const generateCDNUrl = (assetPath, options = {}) => {
  const {
    type = 'image',
    width,
    height,
    format = 'auto',
    quality = 'auto',
    transforms = []
  } = options;

  // Para imágenes usando Cloudinary
  if (type === 'image') {
    let transformString = `f_${format},q_${quality}`;
    
    if (width) transformString += `,w_${width}`;
    if (height) transformString += `,h_${height}`;
    if (transforms.length > 0) transformString += `,${transforms.join(',')}`;
    
    return `${CDN_URLS.images.cloudinary}/${transformString}/${assetPath}`;
  }
  
  // Para otros assets usando jsDelivr
  return `${CDN_URLS.images.jsdelivr}/${assetPath}`;
};

// Función para precargar assets críticos
export const preloadCriticalAssets = () => {
  const criticalAssets = [
    // Precargar fuentes críticas
    {
      href: `${CDN_URLS.fonts.api}?family=Inter:wght@300;400;500;600;700&display=swap`,
      rel: 'preload',
      as: 'style',
      crossorigin: 'anonymous'
    },
    // Precargar imágenes críticas (logo, hero)
    {
      href: generateCDNUrl('logo-et-agency.svg', { type: 'image', format: 'svg' }),
      rel: 'preload',
      as: 'image'
    }
  ];

  criticalAssets.forEach(asset => {
    const link = document.createElement('link');
    Object.keys(asset).forEach(key => {
      link.setAttribute(key, asset[key]);
    });
    document.head.appendChild(link);
  });
};

// Configuración de cache para diferentes tipos de assets
export const CACHE_CONFIG = {
  images: {
    maxAge: 31536000, // 1 año
    staleWhileRevalidate: 86400 // 1 día
  },
  fonts: {
    maxAge: 31536000, // 1 año
    immutable: true
  },
  scripts: {
    maxAge: 31536000, // 1 año
    staleWhileRevalidate: 3600 // 1 hora
  },
  styles: {
    maxAge: 31536000, // 1 año
    staleWhileRevalidate: 3600 // 1 hora
  }
};

// Headers de seguridad para CDN
export const CDN_SECURITY_HEADERS = {
  'Cross-Origin-Resource-Policy': 'cross-origin',
  'Cross-Origin-Embedder-Policy': 'unsafe-none',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Content-Type-Options': 'nosniff'
};

export default {
  CDN_URLS,
  IMAGE_OPTIMIZATION,
  generateCDNUrl,
  preloadCriticalAssets,
  CACHE_CONFIG,
  CDN_SECURITY_HEADERS
};