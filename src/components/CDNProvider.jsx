import React, { createContext, useContext, useEffect, useState } from 'react';
import { preloadCriticalAssets, CDN_URLS, CACHE_CONFIG, generateCDNUrl } from '../config/cdn.js';

// Contexto para CDN
const CDNContext = createContext();

/**
 * Provider para configuración global de CDN
 */
export const CDNProvider = ({ children, config = {} }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [preloadProgress, setPreloadProgress] = useState(0);
  const [cdnStatus, setCdnStatus] = useState('initializing');

  // Configuración por defecto
  const defaultConfig = {
    enablePreload: true,
    enableServiceWorker: true,
    criticalImages: [
      'logo-et-agency.svg',
      'hero-background.jpg'
    ],
    ...config
  };

  // Inicializar CDN
  useEffect(() => {
    const initializeCDN = async () => {
      try {
        setCdnStatus('loading');

        // Precargar assets críticos si está habilitado
        if (defaultConfig.enablePreload) {
          await preloadCriticalAssets();
          setPreloadProgress(50);
        }

        // Registrar Service Worker para cache si está habilitado
        if (defaultConfig.enableServiceWorker && 'serviceWorker' in navigator) {
          await registerServiceWorker();
          setPreloadProgress(75);
        }

        // Configurar headers de cache
        setupCacheHeaders();
        setPreloadProgress(100);
        
        setCdnStatus('ready');
        setIsInitialized(true);
      } catch (error) {
        console.error('Error inicializando CDN:', error);
        setCdnStatus('error');
      }
    };

    initializeCDN();
  }, []);

  // Registrar Service Worker para cache de assets
  const registerServiceWorker = async () => {
    if (!('serviceWorker' in navigator)) return;

    try {
      const registration = await navigator.serviceWorker.register('/cdn-sw.js');
      console.log('Service Worker registrado para CDN:', registration);
    } catch (error) {
      console.error('Error registrando Service Worker:', error);
    }
  };

  // Configurar headers de cache
  const setupCacheHeaders = () => {
    // Configurar meta tags para cache
    const metaTags = [
      { name: 'Cache-Control', content: 'public, max-age=31536000' },
      { name: 'Expires', content: new Date(Date.now() + 31536000000).toUTCString() }
    ];

    metaTags.forEach(({ name, content }) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = name;
        document.head.appendChild(meta);
      }
      meta.content = content;
    });
  };

  // Función para obtener URL optimizada
  const getOptimizedUrl = (assetPath, options = {}) => {
    if (!isInitialized) return assetPath;
    
    // Si es una URL externa, devolverla tal como está
    if (assetPath.startsWith('http')) return assetPath;
    
    // Generar URL optimizada usando la configuración CDN
    return generateCDNUrl(assetPath, options);
  };

  // Función para precargar un asset específico
  const preloadAsset = (assetPath, options = {}) => {
    return new Promise((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = getOptimizedUrl(assetPath, options);
      
      if (options.as) link.as = options.as;
      if (options.type) link.type = options.type;
      if (options.crossorigin) link.crossOrigin = options.crossorigin;
      
      link.onload = () => resolve(assetPath);
      link.onerror = () => reject(new Error(`Error precargando ${assetPath}`));
      
      document.head.appendChild(link);
    });
  };

  // Función para verificar si un asset está en cache
  const isAssetCached = async (assetPath) => {
    if (!('caches' in window)) return false;
    
    try {
      const cache = await caches.open('cdn-assets');
      const response = await cache.match(getOptimizedUrl(assetPath));
      return !!response;
    } catch (error) {
      console.error('Error verificando cache:', error);
      return false;
    }
  };

  // Función para limpiar cache
  const clearCache = async () => {
    if (!('caches' in window)) return;
    
    try {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
      );
      console.log('Cache CDN limpiado');
    } catch (error) {
      console.error('Error limpiando cache:', error);
    }
  };

  const contextValue = {
    isInitialized,
    preloadProgress,
    cdnStatus,
    config: defaultConfig,
    urls: CDN_URLS,
    cacheConfig: CACHE_CONFIG,
    getOptimizedUrl,
    preloadAsset,
    isAssetCached,
    clearCache
  };

  return (
    <CDNContext.Provider value={contextValue}>
      {children}
    </CDNContext.Provider>
  );
};

/**
 * Hook para usar el contexto CDN
 */
export const useCDN = () => {
  const context = useContext(CDNContext);
  if (!context) {
    throw new Error('useCDN debe ser usado dentro de CDNProvider');
  }
  return context;
};

/**
 * Componente de estado de carga CDN
 */
export const CDNLoadingIndicator = ({ className = '' }) => {
  const { cdnStatus, preloadProgress } = useCDN();

  if (cdnStatus === 'ready') return null;

  return (
    <div className={`fixed top-0 left-0 w-full z-50 ${className}`}>
      <div className="bg-blue-600 h-1 transition-all duration-300 ease-out"
           style={{ width: `${preloadProgress}%` }}>
      </div>
      {cdnStatus === 'error' && (
        <div className="bg-red-500 text-white text-sm px-4 py-2 text-center">
          Error cargando recursos CDN
        </div>
      )}
    </div>
  );
};

export default CDNProvider;