import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { writeFileSync } from 'fs'
import { generateSitemap } from './src/utils/sitemapGenerator.js'
import viteCompression from 'vite-plugin-compression'
import path from 'path' // Importar path
// import { imageOptimizationPlugin, imageManifestPlugin } from './vite-plugins/imageOptimization.js'

// Plugin para optimización de CDN
const cdnOptimizationPlugin = () => {
  return {
    name: 'cdn-optimization',
    generateBundle(options, bundle) {
      // Generar manifest de assets para CDN
      const assetManifest = {};
      
      Object.keys(bundle).forEach(fileName => {
        const chunk = bundle[fileName];
        if (chunk.type === 'asset' || chunk.type === 'chunk') {
          assetManifest[chunk.name || fileName] = {
            fileName,
            size: chunk.type === 'asset' ? chunk.source.length : chunk.code.length,
            type: chunk.type,
            hash: fileName.match(/\.[a-f0-9]{8}\./)?.[0] || ''
          };
        }
      });
      
      // Escribir manifest de assets
      this.emitFile({
        type: 'asset',
        fileName: 'assets-manifest.json',
        source: JSON.stringify(assetManifest, null, 2)
      });
    }
  }
}

// Plugin personalizado para generar sitemap automáticamente
const sitemapPlugin = () => {
  return {
    name: 'sitemap-generator',
    writeBundle() {
      // Generar sitemap automáticamente durante el build
      const sitemap = generateSitemap('https://etagency.cl');
      writeFileSync('./dist/sitemap.xml', sitemap);
      console.log('✅ Sitemap generado automáticamente en /dist/sitemap.xml');
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const plugins = [
    react(),
    sitemapPlugin(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icons/*.svg', 'robots.txt', 'sitemap.xml'],
      manifest: {
        name: 'ET Agency - Digital Marketing Solutions',
        short_name: 'ET Agency',
        description: 'Professional digital marketing agency specializing in SEO, web development, and online growth strategies',
        theme_color: '#3b82f6',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait-primary',
        scope: '/',
        start_url: '/',
        lang: 'es',
        categories: ['business', 'marketing', 'productivity'],
        icons: [
          {
            src: '/icons/icon-72x72.svg',
            sizes: '72x72',
            type: 'image/svg+xml',
            purpose: 'maskable any'
          },
          {
            src: '/icons/icon-96x96.svg',
            sizes: '96x96',
            type: 'image/svg+xml',
            purpose: 'maskable any'
          },
          {
            src: '/icons/icon-128x128.svg',
            sizes: '128x128',
            type: 'image/svg+xml',
            purpose: 'maskable any'
          },
          {
            src: '/icons/icon-144x144.svg',
            sizes: '144x144',
            type: 'image/svg+xml',
            purpose: 'maskable any'
          },
          {
            src: '/icons/icon-152x152.svg',
            sizes: '152x152',
            type: 'image/svg+xml',
            purpose: 'maskable any'
          },
          {
            src: '/icons/icon-192x192.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
            purpose: 'maskable any'
          },
          {
            src: '/icons/icon-384x384.svg',
            sizes: '384x384',
            type: 'image/svg+xml',
            purpose: 'maskable any'
          },
          {
            src: '/icons/icon-512x512.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'maskable any'
          }
        ],
        shortcuts: [
          {
            name: 'Servicios',
            short_name: 'Servicios',
            description: 'Ver nuestros servicios de marketing digital',
            url: '/servicios',
            icons: [{ src: '/icons/icon-96x96.svg', sizes: '96x96' }]
          },
          {
            name: 'Portfolio',
            short_name: 'Portfolio',
            description: 'Explorar nuestros proyectos',
            url: '/portfolio',
            icons: [{ src: '/icons/icon-96x96.svg', sizes: '96x96' }]
          },
          {
            name: 'Contacto',
            short_name: 'Contacto',
            description: 'Contactar con nosotros',
            url: '/contacto',
            icons: [{ src: '/icons/icon-96x96.svg', sizes: '96x96' }]
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,jpg,jpeg,svg,webp,avif,woff,woff2,ttf,eot}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 año
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 año
              }
            }
          },
          {
            urlPattern: /^https:\/\/res\.cloudinary\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'cloudinary-images-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 días
              }
            }
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|avif)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 días
              }
            }
          },
          {
            urlPattern: /\.(?:js|css)$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static-resources',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 7 // 7 días
              }
            }
          },
          {
            urlPattern: /^\/api\/.*/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 5 // 5 minutos
              },
              networkTimeoutSeconds: 3
            }
          }
        ],
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true
      },
      devOptions: {
        enabled: true,
        type: 'module'
      }
    })
  ];

  // Agregar plugins de optimización en build de producción
  if (command === 'build' && mode === 'production') {
    // Plugin de optimización CDN
    plugins.push(cdnOptimizationPlugin());
    // Compresión Gzip
    plugins.push(
      viteCompression({
        algorithm: 'gzip',
        ext: '.gz',
        threshold: 1024,
        deleteOriginFile: false,
        filter: /\.(js|mjs|json|css|html|svg)$/i,
        verbose: true
      })
    );
    
    // Compresión Brotli
    plugins.push(
      viteCompression({
        algorithm: 'brotliCompress',
        ext: '.br',
        threshold: 1024,
        deleteOriginFile: false,
        filter: /\.(js|mjs|json|css|html|svg)$/i,
        verbose: true
      })
    );
    
    // Optimización de imágenes (comentado por ahora)
    // plugins.push(
    //   imageOptimizationPlugin({
    //     inputDir: 'public/images',
    //     outputDir: 'dist/images',
    //     formats: ['webp', 'jpg'],
    //     sizes: [480, 768, 1024, 1280, 1920],
    //     quality: { webp: 85, jpg: 85, png: 90 }
    //   }),
    //   imageManifestPlugin()
    // );
  }

  return {
    plugins,
    base: '/', // Asegurar que las rutas de los assets sean absolutas desde la raíz
    // Configuración de resolución de módulos
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'), // Añadir alias para 'src'
      },
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
    },
    // Configuración de assets para CDN
    assetsInclude: ['**/*.svg', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.webp', '**/*.avif'],
    
  server: {
    port: 8539,
    open: true,
    host: true, // Permite acceso desde la red local
    // Headers para desarrollo con CDN
    headers: {
      'Cross-Origin-Resource-Policy': 'cross-origin',
      'Cross-Origin-Embedder-Policy': 'unsafe-none'
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    // Configuración de assets para CDN
    assetsDir: 'assets',
    assetsInlineLimit: 4096, // 4kb - archivos más pequeños se incluyen inline
    
    // Optimizaciones para SEO y CDN
    rollupOptions: {
      output: {
        // Nombres de archivos con hash para cache busting
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/css/i.test(ext)) {
            return `assets/css/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          animations: ['framer-motion'],
          icons: ['lucide-react'],
          utils: ['./src/utils/index.js', './src/config/index.js']
        }
      },
      
      // Externalizar dependencias para CDN (opcional)
      external: mode === 'production' ? [] : [],
    },
    
    // Compresión y optimización
    minify: 'esbuild', // Usar esbuild en lugar de terser para evitar errores
    
    // Configuración de target para mejor compatibilidad
    target: ['es2015', 'chrome58', 'firefox57', 'safari11'],
    
    // Optimización de CSS
    cssCodeSplit: true,
    cssMinify: true
  },
  // Optimizaciones adicionales
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version || '1.0.0')
  },
  // Configuración para mejor SEO
  esbuild: {
    legalComments: 'none'
  }
  };
});