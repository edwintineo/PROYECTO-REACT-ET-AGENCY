import express from 'express';
import compression from 'compression';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import compressionConfig from './compression.config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware de compresión inteligente
app.use(compression(compressionConfig.express));

// Middleware de headers de seguridad
app.use((req, res, next) => {
  // Aplicar headers de seguridad
  Object.entries(compressionConfig.security.headers).forEach(([key, value]) => {
    res.setHeader(key, value);
  });
  next();
});

// Middleware para servir archivos estáticos precomprimidos
app.use((req, res, next) => {
  const acceptEncoding = req.headers['accept-encoding'] || '';
  const url = req.url;
  
  // Solo para archivos estáticos
  if (url.match(/\.(js|css|html|svg|json)$/)) {
    const filePath = path.join(__dirname, 'dist', url);
    
    // Intentar servir Brotli primero (mejor compresión)
    if (acceptEncoding.includes('br')) {
      const brotliPath = filePath + '.br';
      if (fs.existsSync(brotliPath)) {
        res.set({
          'Content-Encoding': 'br',
          'Content-Type': getContentType(url),
          'Cache-Control': 'public, max-age=31536000, immutable'
        });
        return res.sendFile(path.resolve(brotliPath));
      }
    }
    
    // Luego intentar Gzip
    if (acceptEncoding.includes('gzip')) {
      const gzipPath = filePath + '.gz';
      if (fs.existsSync(gzipPath)) {
        res.set({
          'Content-Encoding': 'gzip',
          'Content-Type': getContentType(url),
          'Cache-Control': 'public, max-age=31536000, immutable'
        });
        return res.sendFile(path.resolve(gzipPath));
      }
    }
  }
  
  next();
});

// Servir archivos estáticos desde dist con configuración optimizada
app.use(express.static(path.join(__dirname, 'dist'), {
  maxAge: '1y',
  etag: true,
  lastModified: true,
  setHeaders: (res, filePath) => {
    const config = compressionConfig.cacheHeaders;
    
    if (filePath.endsWith('.html')) {
      Object.entries(config.html).forEach(([key, value]) => {
        if (key !== 'ETag') res.setHeader(key, value);
      });
    } else if (filePath.match(/\.(js|css)$/)) {
      Object.entries(config.assets).forEach(([key, value]) => {
        if (key !== 'ETag') res.setHeader(key, value);
      });
    } else if (filePath.match(/\.(woff2?|ttf|eot|otf)$/)) {
      Object.entries(config.fonts).forEach(([key, value]) => {
        if (key !== 'ETag') res.setHeader(key, value);
      });
    } else if (filePath.match(/\.(jpg|jpeg|png|gif|webp|svg|ico)$/)) {
      Object.entries(config.images).forEach(([key, value]) => {
        if (key !== 'ETag') res.setHeader(key, value);
      });
    } else {
      Object.entries(config.static).forEach(([key, value]) => {
        if (key !== 'ETag') res.setHeader(key, value);
      });
    }
  }
}));

// Manejar rutas SPA - servir index.html para todas las rutas no encontradas
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'dist', 'index.html');
  
  // Intentar servir index.html comprimido
  const acceptEncoding = req.headers['accept-encoding'] || '';
  
  if (acceptEncoding.includes('br') && fs.existsSync(indexPath + '.br')) {
    res.set({
      'Content-Encoding': 'br',
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate'
    });
    return res.sendFile(path.resolve(indexPath + '.br'));
  }
  
  if (acceptEncoding.includes('gzip') && fs.existsSync(indexPath + '.gz')) {
    res.set({
      'Content-Encoding': 'gzip',
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate'
    });
    return res.sendFile(path.resolve(indexPath + '.gz'));
  }
  
  // Servir index.html normal si no hay versión comprimida
  res.sendFile(path.resolve(indexPath));
});

// Función helper para obtener Content-Type
function getContentType(url) {
  const ext = path.extname(url).toLowerCase();
  const mimeTypes = {
    '.js': 'application/javascript; charset=utf-8',
    '.mjs': 'application/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.html': 'text/html; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.svg': 'image/svg+xml; charset=utf-8'
  };
  return mimeTypes[ext] || 'application/octet-stream';
}

// Middleware de logging para desarrollo
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    const encoding = res.get('Content-Encoding');
    console.log(`${req.method} ${req.url} ${encoding ? `[${encoding}]` : ''}`);
    next();
  });
}

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en puerto ${PORT}`);
  console.log(`📦 Sirviendo archivos desde: ${path.join(__dirname, 'dist')}`);
  console.log(`🗜️  Compresión Gzip/Brotli habilitada`);
  console.log(`⚡ Modo: ${process.env.NODE_ENV || 'development'}`);
});

export default app;