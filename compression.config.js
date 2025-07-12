/**
 * Configuración avanzada de compresión para assets
 * Optimiza la entrega de archivos estáticos con Gzip/Brotli
 */
import { constants } from 'zlib';

const compressionConfig = {
  // Configuración para vite-plugin-compression
  vite: {
    gzip: {
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 1024, // Solo comprimir archivos > 1KB
      deleteOriginFile: false,
      filter: /\.(js|mjs|json|css|html|svg|xml|txt)$/i,
      verbose: true,
      compressionOptions: {
        level: 9, // Máxima compresión para build
        memLevel: 8
      }
    },
    brotli: {
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 1024,
      deleteOriginFile: false,
      filter: /\.(js|mjs|json|css|html|svg|xml|txt)$/i,
      verbose: true
    }
  },

  // Configuración para Express compression middleware
  express: {
    level: 6, // Balance entre velocidad y compresión
    threshold: 1024,
    filter: (req, res) => {
      // No comprimir si el cliente no lo soporta
      if (req.headers['x-no-compression']) {
        return false;
      }
      
      // No comprimir respuestas que ya están comprimidas
      if (res.getHeader('Content-Encoding')) {
        return false;
      }
      
      // Comprimir solo tipos MIME específicos
      const contentType = res.getHeader('Content-Type');
      if (contentType) {
        return /^(text\/|application\/(javascript|json|xml)|image\/svg\+xml)/.test(contentType);
      }
      
      return true;
    },
    // Configuración específica para Brotli
    brotli: {
      enabled: true,
      zlib: {
        params: {
          [constants.BROTLI_PARAM_QUALITY]: 6,
          [constants.BROTLI_PARAM_SIZE_HINT]: 0
        }
      }
    }
  },

  // Headers de cache optimizados por tipo de archivo
  cacheHeaders: {
    // HTML - Sin cache para permitir actualizaciones
    html: {
      'Cache-Control': 'public, max-age=0, must-revalidate',
      'ETag': true
    },
    // JavaScript y CSS con hash - Cache largo
    assets: {
      'Cache-Control': 'public, max-age=31536000, immutable',
      'ETag': false
    },
    // Imágenes - Cache medio
    images: {
      'Cache-Control': 'public, max-age=2592000', // 30 días
      'ETag': true
    },
    // Fuentes - Cache largo
    fonts: {
      'Cache-Control': 'public, max-age=31536000, immutable',
      'ETag': false
    },
    // Otros archivos estáticos
    static: {
      'Cache-Control': 'public, max-age=86400', // 1 día
      'ETag': true
    }
  },

  // Tipos MIME para compresión
  compressibleTypes: [
    'text/html',
    'text/css',
    'text/plain',
    'text/xml',
    'text/javascript',
    'application/javascript',
    'application/json',
    'application/xml',
    'application/rss+xml',
    'application/atom+xml',
    'image/svg+xml',
    'application/x-font-ttf',
    'application/vnd.ms-fontobject',
    'font/opentype'
  ],

  // Configuración de seguridad
  security: {
    // Headers de seguridad
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
    },
    // CSP para recursos
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
        fontSrc: ["'self'"],
        connectSrc: ["'self'"]
      }
    }
  }
};

export default compressionConfig;