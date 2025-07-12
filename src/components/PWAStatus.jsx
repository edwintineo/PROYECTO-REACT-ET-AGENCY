import React, { useState, useEffect } from 'react';
import { usePWA } from '../hooks/usePWA';

/**
 * Componente para mostrar el estado PWA y controles de administración
 */
const PWAStatus = ({ className = '' }) => {
  const {
    isOnline,
    isInstalled,
    notificationPermission,
    hasServiceWorker,
    requestNotificationPermission,
    showNotification,
    updateServiceWorker,
    clearCache,
    getStorageInfo
  } = usePWA();

  const [storageInfo, setStorageInfo] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);

  // Obtener información de almacenamiento
  useEffect(() => {
    const fetchStorageInfo = async () => {
      const info = await getStorageInfo();
      setStorageInfo(info);
    };
    
    fetchStorageInfo();
    
    // Actualizar cada 30 segundos
    const interval = setInterval(fetchStorageInfo, 30000);
    return () => clearInterval(interval);
  }, [getStorageInfo]);

  // Manejar actualización de SW
  const handleUpdate = async () => {
    try {
      await updateServiceWorker();
      setLastUpdate(new Date());
      showNotification('Aplicación actualizada', {
        body: 'La aplicación se ha actualizado correctamente',
        icon: '/icons/icon-96x96.svg'
      });
    } catch (error) {
      console.error('Error actualizando:', error);
    }
  };

  // Manejar limpieza de cache
  const handleClearCache = async () => {
    try {
      const success = await clearCache();
      if (success) {
        showNotification('Cache limpiado', {
          body: 'El cache se ha limpiado correctamente',
          icon: '/icons/icon-96x96.svg'
        });
        // Recargar para aplicar cambios
        setTimeout(() => window.location.reload(), 1000);
      }
    } catch (error) {
      console.error('Error limpiando cache:', error);
    }
  };

  // Manejar solicitud de notificaciones
  const handleNotificationRequest = async () => {
    try {
      const permission = await requestNotificationPermission();
      if (permission === 'granted') {
        showNotification('¡Notificaciones activadas!', {
          body: 'Ahora recibirás notificaciones importantes',
          icon: '/icons/icon-96x96.svg'
        });
      }
    } catch (error) {
      console.error('Error solicitando notificaciones:', error);
    }
  };

  // Formatear bytes
  const formatBytes = (bytes) => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 ${className}`}>
      {/* Header */}
      <div 
        className="p-4 cursor-pointer flex items-center justify-between"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-3">
          <div className={`w-3 h-3 rounded-full ${
            isOnline ? 'bg-green-500' : 'bg-red-500'
          }`}></div>
          <h3 className="font-medium text-gray-900 dark:text-white">
            Estado PWA
          </h3>
          {isInstalled && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              Instalada
            </span>
          )}
        </div>
        
        <svg 
          className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
            isExpanded ? 'rotate-180' : ''
          }`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Contenido expandible */}
      {isExpanded && (
        <div className="px-4 pb-4 space-y-4">
          {/* Estado general */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Conexión:</span>
                <span className={`font-medium ${
                  isOnline ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`}>
                  {isOnline ? 'En línea' : 'Sin conexión'}
                </span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Service Worker:</span>
                <span className={`font-medium ${
                  hasServiceWorker ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`}>
                  {hasServiceWorker ? 'Activo' : 'Inactivo'}
                </span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Instalada:</span>
                <span className={`font-medium ${
                  isInstalled ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'
                }`}>
                  {isInstalled ? 'Sí' : 'No'}
                </span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Notificaciones:</span>
                <span className={`font-medium ${
                  notificationPermission === 'granted' 
                    ? 'text-green-600 dark:text-green-400' 
                    : notificationPermission === 'denied'
                    ? 'text-red-600 dark:text-red-400'
                    : 'text-yellow-600 dark:text-yellow-400'
                }`}>
                  {notificationPermission === 'granted' ? 'Permitidas' : 
                   notificationPermission === 'denied' ? 'Denegadas' : 'Pendientes'}
                </span>
              </div>
            </div>
          </div>

          {/* Información de almacenamiento */}
          {storageInfo && (
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                Almacenamiento
              </h4>
              <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                <div className="flex justify-between">
                  <span>Usado:</span>
                  <span>{formatBytes(storageInfo.usage)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Disponible:</span>
                  <span>{formatBytes(storageInfo.quota)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Porcentaje:</span>
                  <span>{storageInfo.usagePercentage}%</span>
                </div>
              </div>
              
              {/* Barra de progreso */}
              <div className="mt-2">
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(storageInfo.usagePercentage, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          {/* Última actualización */}
          {lastUpdate && (
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Última actualización: {lastUpdate.toLocaleTimeString()}
            </div>
          )}

          {/* Controles */}
          <div className="flex flex-wrap gap-2">
            {notificationPermission === 'default' && (
              <button
                onClick={handleNotificationRequest}
                className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800 transition-colors"
              >
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.828 4.828A4 4 0 015.5 4H9v1H5.5a3 3 0 00-2.121.879L4.828 4.828zM15 8h.01M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Activar notificaciones
              </button>
            )}
            
            <button
              onClick={handleUpdate}
              className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-200 dark:hover:bg-green-800 transition-colors"
            >
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Actualizar
            </button>
            
            <button
              onClick={handleClearCache}
              className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900 dark:text-red-200 dark:hover:bg-red-800 transition-colors"
            >
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Limpiar cache
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PWAStatus;