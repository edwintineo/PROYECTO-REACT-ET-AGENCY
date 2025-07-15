import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getRouteConfig } from '../utils/sitemapGenerator';

/**
 * Hook personalizado para manejo dinámico de SEO
 * Actualiza automáticamente los meta tags basado en la ruta actual
 */
export const useSEO = () => {
  const location = useLocation();

  useEffect(() => {
    // Obtener configuración de la ruta actual
    const routeConfig = getRouteConfig(location.pathname);
    
    if (routeConfig) {
      // Actualizar título de la página si no está manejado por el componente SEO
      if (!document.querySelector('title')?.textContent?.includes('ET Agency')) {
        document.title = `${routeConfig.title} | ET Agency`;
      }
    }

    // Agregar clase para tracking de páginas
    document.body.setAttribute('data-page', location.pathname);
    
    // Limpiar al desmontar
    return () => {
      document.body.removeAttribute('data-page');
    };
  }, [location.pathname]);

  return {
    currentPath: location.pathname,
    routeConfig: getRouteConfig(location.pathname)
  };
};

/**
 * Hook para generar breadcrumbs automáticamente
 */
export const useBreadcrumbs = () => {
  const location = useLocation();
  
  const generateBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = [{ name: 'Inicio', path: '/' }];
    
    let currentPath = '';
    pathSegments.forEach(segment => {
      currentPath += `/${segment}`;
      const routeConfig = getRouteConfig(currentPath);
      
      if (routeConfig) {
        breadcrumbs.push({
          name: routeConfig.title.split(' - ')[0], // Tomar solo la primera parte del título
          path: currentPath
        });
      } else {
        // Fallback para rutas no configuradas
        breadcrumbs.push({
          name: segment.charAt(0).toUpperCase() + segment.slice(1),
          path: currentPath
        });
      }
    });
    
    return breadcrumbs;
  };

  return {
    breadcrumbs: generateBreadcrumbs(),
    currentPath: location.pathname
  };
};

/**
 * Hook para tracking de eventos SEO
 */
export const useSEOTracking = () => {
  const location = useLocation();

  const trackPageView = (customData = {}) => {
    // Google Analytics 4 tracking
    if (typeof gtag !== 'undefined') {
      gtag('config', 'GA_MEASUREMENT_ID', {
        page_path: location.pathname,
        page_title: document.title,
        ...customData
      });
    }

    // Facebook Pixel tracking
    if (typeof fbq !== 'undefined') {
      fbq('track', 'PageView');
    }

    // Custom tracking para análisis interno
    console.log('SEO Tracking:', {
      page: location.pathname,
      title: document.title,
      timestamp: new Date().toISOString(),
      ...customData
    });
  };

  const trackConversion = (eventName, data = {}) => {
    // Google Analytics conversion tracking
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, {
        event_category: 'conversion',
        event_label: location.pathname,
        ...data
      });
    }

    // Facebook Pixel conversion tracking
    if (typeof fbq !== 'undefined') {
      fbq('track', eventName, data);
    }
  };

  useEffect(() => {
    // Auto-track page views
    trackPageView();
  }, [location.pathname]);

  return {
    trackPageView,
    trackConversion,
    currentPath: location.pathname
  };
};

export default useSEO;