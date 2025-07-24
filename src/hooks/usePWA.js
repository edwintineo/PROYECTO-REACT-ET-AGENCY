import { useState, useEffect, useCallback } from 'react';

/**
 * Hook personalizado para manejar funcionalidades PWA
 * @returns {Object} Estado y funciones PWA
 */
export const usePWA = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [swRegistration, setSwRegistration] = useState(null);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [notificationPermission, setNotificationPermission] = useState(
    'Notification' in window ? Notification.permission : 'denied'
  );

  // Registrar Service Worker
  const registerServiceWorker = useCallback(async () => {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/pwa-sw.js', {
          scope: '/'
        });
        
        setSwRegistration(registration);
        console.log('✅ Service Worker registrado:', registration.scope);
        
        // Escuchar actualizaciones
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // Nueva versión disponible
                showUpdateNotification();
              }
            });
          }
        });
        
        return registration;
      } catch (error) {
        console.error('❌ Error registrando Service Worker:', error);
        return null;
      }
    }
    return null;
  }, []);

  // Instalar PWA
  const installPWA = useCallback(async () => {
    if (!deferredPrompt) {
      console.log('❌ No hay prompt de instalación disponible');
      return false;
    }

    try {
      // Mostrar prompt de instalación
      deferredPrompt.prompt();
      
      // Esperar respuesta del usuario
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('✅ PWA instalada por el usuario');
        setIsInstalled(true);
        setIsInstallable(false);
        setDeferredPrompt(null);
        return true;
      } else {
        console.log('❌ Usuario rechazó la instalación');
        return false;
      }
    } catch (error) {
      console.error('❌ Error durante la instalación:', error);
      return false;
    }
  }, [deferredPrompt]);

  // Solicitar permisos de notificación
  const requestNotificationPermission = useCallback(async () => {
    if (!('Notification' in window)) {
      console.log('❌ Notificaciones no soportadas');
      return 'denied';
    }

    try {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);
      
      if (permission === 'granted') {
        console.log('✅ Permisos de notificación concedidos');
        
        // Suscribirse a push notifications si hay SW
        if (swRegistration) {
          await subscribeToPushNotifications();
        }
      }
      
      return permission;
    } catch (error) {
      console.error('❌ Error solicitando permisos:', error);
      return 'denied';
    }
  }, [swRegistration]);

  // Suscribirse a push notifications
  const subscribeToPushNotifications = useCallback(async () => {
    if (!swRegistration || notificationPermission !== 'granted') {
      return null;
    }

    try {
      // Generar VAPID key (en producción usar clave real)
      const vapidPublicKey = 'BEl62iUYgUivxIkv69yViEuiBIa40HI80NM9f8HnKJuOmqmVOWjWYmJTqQriLGPTBQIDjqkhPocnetXcBcMwbAo';
      
      const subscription = await swRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidPublicKey)
      });
      
      console.log('✅ Suscrito a push notifications:', subscription);
      
      // Enviar suscripción al servidor (implementar endpoint)
      // await sendSubscriptionToServer(subscription);
      
      return subscription;
    } catch (error) {
      console.error('❌ Error suscribiéndose a push:', error);
      return null;
    }
  }, [swRegistration, notificationPermission]);

  // Mostrar notificación local
  const showNotification = useCallback((title, options = {}) => {
    if (notificationPermission !== 'granted') {
      console.log('❌ Sin permisos para mostrar notificaciones');
      return;
    }

    const defaultOptions = {
      icon: '/icons/icon-192x192.svg',
      badge: '/icons/icon-96x96.svg',
      vibrate: [200, 100, 200],
      ...options
    };

    if (swRegistration) {
      // Usar Service Worker para notificaciones (soporta acciones)
      swRegistration.showNotification(title, defaultOptions);
    } else {
      // Fallback a notificación directa (sin acciones)
      const { actions, ...fallbackOptions } = defaultOptions;
      new Notification(title, fallbackOptions);
    }
  }, [notificationPermission, swRegistration]);

  // Actualizar Service Worker
  const updateServiceWorker = useCallback(async () => {
    if (!swRegistration) return;

    try {
      await swRegistration.update();
      console.log('🔄 Service Worker actualizado');
    } catch (error) {
      console.error('❌ Error actualizando Service Worker:', error);
    }
  }, [swRegistration]);

  // Limpiar cache
  const clearCache = useCallback(async () => {
    if ('caches' in window) {
      try {
        const cacheNames = await caches.keys();
        await Promise.all(
          cacheNames.map(name => caches.delete(name))
        );
        console.log('🗑️ Cache limpiado');
        return true;
      } catch (error) {
        console.error('❌ Error limpiando cache:', error);
        return false;
      }
    }
    return false;
  }, []);

  // Obtener información de almacenamiento
  const getStorageInfo = useCallback(async () => {
    if ('storage' in navigator && 'estimate' in navigator.storage) {
      try {
        const estimate = await navigator.storage.estimate();
        return {
          quota: estimate.quota,
          usage: estimate.usage,
          usagePercentage: ((estimate.usage / estimate.quota) * 100).toFixed(2)
        };
      } catch (error) {
        console.error('❌ Error obteniendo info de almacenamiento:', error);
        return null;
      }
    }
    return null;
  }, []);

  // Efectos
  useEffect(() => {
    // Registrar Service Worker al montar
    registerServiceWorker();

    // Escuchar cambios de conectividad
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Escuchar evento de instalación
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
      console.log('📱 PWA instalable detectada');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Detectar si ya está instalada
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
      console.log('✅ PWA ya instalada');
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    // Detectar si se ejecuta como PWA
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                        window.navigator.standalone ||
                        document.referrer.includes('android-app://');
    
    if (isStandalone) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [registerServiceWorker]);

  // Funciones auxiliares
  const showUpdateNotification = () => {
    showNotification('Actualización disponible', {
      body: 'Una nueva versión de la aplicación está disponible',
      actions: [
        { action: 'update', title: 'Actualizar' },
        { action: 'dismiss', title: 'Más tarde' }
      ]
    });
  };

  return {
    // Estado
    isOnline,
    isInstallable,
    isInstalled,
    notificationPermission,
    swRegistration,
    
    // Funciones
    installPWA,
    requestNotificationPermission,
    showNotification,
    updateServiceWorker,
    clearCache,
    getStorageInfo,
    
    // Utilidades
    canInstall: isInstallable && !isInstalled,
    canNotify: notificationPermission === 'granted',
    hasServiceWorker: !!swRegistration
  };
};

// Función auxiliar para convertir VAPID key
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export default usePWA;